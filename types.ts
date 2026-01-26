export interface StyleItem {
  id: string;
  name: string;
  category: string;
  prompt: string; // The generated prompt text (English)
  descriptionCN: string; // The detailed description in Chinese
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  items: StyleItem[];
}

export type GeneratedImagesMap = Record<string, string>; // Maps Style ID to Base64 Image Data