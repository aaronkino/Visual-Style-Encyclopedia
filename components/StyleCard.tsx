import React, { useState, useEffect, useRef } from 'react';
import { Heart, Copy, Sparkles, Loader2, Image as ImageIcon, AlertCircle, Play } from 'lucide-react';
import { StyleItem } from '../types';
import { imageQueue } from '../services/generationQueue';

interface StyleCardProps {
  item: StyleItem;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  cachedImage?: string;
  onImageGenerated: (id: string, dataUrl: string) => void;
  showEnglishPrompt: boolean;
}

const StyleCard: React.FC<StyleCardProps> = ({
  item,
  isFavorite,
  onToggleFavorite,
  cachedImage,
  onImageGenerated,
  showEnglishPrompt,
}) => {
  // States: 'idle' | 'queued' | 'loading' | 'error' | 'success'
  const [status, setStatus] = useState<'idle' | 'queued' | 'loading' | 'error' | 'success'>('idle');
  const [copied, setCopied] = useState(false);

  // Sync status with cachedImage prop
  useEffect(() => {
    if (cachedImage && status !== 'queued' && status !== 'loading') {
      setStatus('success');
    }
  }, [cachedImage]);

  const handleGenerate = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    setStatus('queued');
    imageQueue.enqueue({
      id: item.id,
      prompt: item.prompt,
      onSuccess: (url) => {
        onImageGenerated(item.id, url);
        setStatus('success');
      },
      onFailure: () => {
        setStatus('error');
      }
    });
  };

  const copyToClipboard = () => {
    const textToCopy = showEnglishPrompt ? item.prompt : item.descriptionCN;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all shadow-sm hover:shadow-xl hover:shadow-blue-500/10 flex flex-col h-full">
      {/* Image Area */}
      <div className="relative aspect-square bg-slate-900 w-full overflow-hidden">
        {cachedImage ? (
          <>
            <img
              src={cachedImage}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-in fade-in duration-500"
            />
            {/* Loading Overlay for Regeneration */}
            {(status === 'queued' || status === 'loading') && (
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 animate-in fade-in duration-300">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
                <span className="text-xs text-blue-400 font-medium">
                  {status === 'queued' ? 'Queued...' : 'Regenerating...'}
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 p-4 text-center bg-slate-900">
            {status === 'queued' || status === 'loading' ? (
              <div className="flex flex-col items-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
                <span className="text-xs text-blue-400 font-medium">
                  {status === 'queued' ? 'Queued...' : 'Generating...'}
                </span>
              </div>
            ) : status === 'error' ? (
              <div className="flex flex-col items-center">
                 <AlertCircle className="w-8 h-8 text-red-400 mb-2" />
                 <span className="text-red-400 text-xs mb-2">Generation Failed</span>
                 <button 
                    onClick={handleGenerate} 
                    className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-full text-xs text-slate-200 transition-colors"
                 >
                   Retry
                 </button>
              </div>
            ) : (
              <button 
                onClick={handleGenerate}
                className="group/btn flex flex-col items-center justify-center w-full h-full hover:bg-slate-800/50 transition-colors"
                title="Generate Image"
              >
                <div className="bg-slate-800 p-4 rounded-full mb-3 group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-all duration-300 shadow-lg shadow-black/20 group-hover/btn:shadow-blue-500/20 text-slate-400">
                  <Play className="w-6 h-6 ml-1" />
                </div>
                <span className="text-xs font-medium text-slate-500 group-hover/btn:text-slate-300">Click to Generate</span>
              </button>
            )}
          </div>
        )}

        {/* Floating Actions */}
        <div className="absolute top-2 right-2 flex gap-2 z-30">
           <button
            onClick={onToggleFavorite}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isFavorite 
                ? 'bg-rose-500/90 text-white shadow-lg shadow-rose-500/20' 
                : 'bg-black/40 text-white hover:bg-black/60'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
           <h3 className="font-semibold text-slate-100 line-clamp-1" title={item.name}>
            {item.name}
           </h3>
           <span className="text-[10px] px-1.5 py-0.5 rounded border border-slate-600 text-slate-400 bg-slate-800/50 whitespace-nowrap ml-2">
             {item.category.split(' ')[0]}
           </span>
        </div>

        {/* Dynamic Prompt Display Area */}
        <div className="text-xs text-slate-400 flex-grow font-mono bg-slate-900/50 p-2 rounded border border-slate-700/50 mb-4 h-20 overflow-y-auto scrollbar-thin">
          {showEnglishPrompt ? (
            <span className="text-indigo-300">{item.prompt}</span>
          ) : (
             <span className="text-slate-300">
               {item.descriptionCN}
             </span>
          )}
        </div>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={copyToClipboard}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
              copied
                ? 'bg-green-500/10 border-green-500/50 text-green-400'
                : 'bg-slate-700 hover:bg-slate-600 border-transparent text-slate-200'
            }`}
          >
            <Copy className="w-3 h-3" />
            {copied ? 'Copied!' : showEnglishPrompt ? 'Copy Prompt' : '複製描述'}
          </button>
          
          {cachedImage && (
             <button
              onClick={handleGenerate}
              className="px-3 py-2 rounded-lg text-xs font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors border border-transparent hover:border-slate-500 group/regen"
              title="Regenerate Image"
            >
              <Sparkles className="w-3 h-3 group-hover/regen:text-blue-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StyleCard;