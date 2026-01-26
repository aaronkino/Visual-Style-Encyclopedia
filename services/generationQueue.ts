import { generateImage } from './geminiService';

type Task = {
  id: string;
  prompt: string;
  onSuccess: (data: string) => void;
  onFailure: (err: any) => void;
  retries: number;
};

class GenerationQueue {
  private queue: Task[] = [];
  private isProcessing = false;
  
  // Rate limiting settings: 
  // Gemini Free tier has strict limits. We increase base delay to avoid hitting them too fast.
  // 5000ms = 5 seconds delay between requests by default.
  private delayMs = 5000; 
  private lastRequestTime = 0;

  enqueue(task: Omit<Task, 'retries'>) {
    this.queue.push({ ...task, retries: 0 });
    this.processQueue();
  }

  private async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const task = this.queue[0]; // Peek at the first task

      const now = Date.now();
      const timeSinceLast = now - this.lastRequestTime;
      
      // Wait if we are within the delay window (or if a backoff was set via lastRequestTime being in future)
      if (timeSinceLast < this.delayMs) {
        await new Promise(resolve => setTimeout(resolve, this.delayMs - timeSinceLast));
      }

      try {
        const result = await generateImage(task.prompt);
        this.lastRequestTime = Date.now();
        
        // Success: Remove from queue and callback
        this.queue.shift(); 
        task.onSuccess(result);
      } catch (error: any) {
        console.error(`Generation error for ${task.id}:`, error);

        // Detect Rate Limiting (429) or Quota Exceeded
        const errStr = String(error) + (typeof error === 'object' ? JSON.stringify(error) : '');
        const isRateLimit = 
          errStr.includes('429') || 
          errStr.includes('RESOURCE_EXHAUSTED') || 
          errStr.includes('quota');

        if (isRateLimit && task.retries < 3) {
           const backoffTime = 15000 * (task.retries + 1); // 15s, 30s, 45s
           console.warn(`Rate limit hit for ${task.id}. Retrying in ${backoffTime/1000}s... (Attempt ${task.retries + 1})`);
           
           task.retries += 1;
           // Set lastRequestTime into the future to force the loop to wait before retrying THIS task
           this.lastRequestTime = Date.now() + backoffTime;
           
           // We do NOT shift the queue. The next iteration will pick up the same task after the delay.
        } else {
           // Fatal error or max retries exceeded
           this.queue.shift(); // Remove failed task
           task.onFailure(error);
           
           // Small buffer to prevent rapid failure loops
           this.lastRequestTime = Date.now() + 2000;
        }
      }
    }

    this.isProcessing = false;
  }
}

export const imageQueue = new GenerationQueue();