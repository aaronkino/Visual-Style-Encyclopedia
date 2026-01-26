import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import StyleCard from './components/StyleCard';
import { CATEGORIES, INITIAL_FAVORITE_IDS } from './constants';
import { StyleItem, GeneratedImagesMap } from './types';
import { Key } from 'lucide-react';

interface AIStudio {
  openSelectKey: () => Promise<void>;
  hasSelectedApiKey: () => Promise<boolean>;
}

export default function App() {
  // State
  const [favorites, setFavorites] = useState<Set<string>>(new Set(INITIAL_FAVORITE_IDS));
  const [generatedImages, setGeneratedImages] = useState<GeneratedImagesMap>({});
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(!!process.env.API_KEY);
  const [showEnglishPrompts, setShowEnglishPrompts] = useState(false); // Toggle state

  // Load data on mount (LocalStorage + Default JSON)
  useEffect(() => {
    const initializeData = async () => {
      let loadedFromLocal = false;

      // 1. Try Local Storage for Favorites
      const savedFavs = localStorage.getItem('vse-favorites');
      if (savedFavs) {
        try {
          const parsed = JSON.parse(savedFavs);
          if (Array.isArray(parsed)) {
             setFavorites(new Set(parsed));
             loadedFromLocal = true;
          }
        } catch (e) {
          console.error("Failed to parse favorites from local storage", e);
        }
      }

      // 2. Try fetching default configuration (visual-styles-default.json)
      // This is useful for GitHub Pages deployment where a default set of images/favorites is provided.
      try {
        const response = await fetch('./visual-styles-default.json');
        if (response.ok) {
          const data = await response.json();
          
          // Load images (Merge with existing)
          if (data.images && typeof data.images === 'object') {
            setGeneratedImages(prev => ({ ...prev, ...data.images }));
          }

          // Load favorites ONLY if not loaded from LocalStorage (User prefs take priority)
          if (!loadedFromLocal && data.favorites && Array.isArray(data.favorites)) {
            setFavorites(new Set(data.favorites));
          }
          
          console.log("Default configuration loaded.");
        }
      } catch (error) {
        // It's normal for this file to be missing in dev or if not uploaded
        console.log("No default configuration file found.");
      }

      // 3. Check API Key
      checkApiKey();
    };

    initializeData();
  }, []);

  const checkApiKey = async () => {
    if (process.env.API_KEY) {
      setHasApiKey(true);
      return;
    }
    const aistudio = (window as any).aistudio as AIStudio | undefined;
    if (aistudio) {
      const has = await aistudio.hasSelectedApiKey();
      setHasApiKey(has);
    }
  };

  const handleSelectKey = async () => {
     const aistudio = (window as any).aistudio as AIStudio | undefined;
     if (aistudio) {
        await aistudio.openSelectKey();
        await checkApiKey();
        // Force re-render of components that might rely on new key by reloading or state update
        window.location.reload(); 
     } else {
        alert("API Key selection is only available in the Project IDX / GenAI environment. Otherwise, set the API Key in your environment variables.");
     }
  };

  // Save favorites whenever they change
  useEffect(() => {
    localStorage.setItem('vse-favorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const updateGeneratedImage = (id: string, dataUrl: string) => {
    setGeneratedImages(prev => ({ ...prev, [id]: dataUrl }));
  };

  // Import / Export
  const handleExport = () => {
    // Export both favorites and the generated image data
    const exportData = {
      version: 1,
      timestamp: new Date().toISOString(),
      favorites: Array.from(favorites),
      images: generatedImages
    };
    
    const data = JSON.stringify(exportData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visual-styles-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result as string;
        const parsed = JSON.parse(result);
        
        let restoredImagesCount = 0;
        let restoredFavsCount = 0;

        // Check for new format (with 'images' and 'favorites' keys)
        if (parsed.favorites || parsed.images) {
            if (Array.isArray(parsed.favorites)) {
                setFavorites(new Set(parsed.favorites));
                restoredFavsCount = parsed.favorites.length;
            }
            if (parsed.images && typeof parsed.images === 'object') {
                setGeneratedImages(prev => ({ ...prev, ...parsed.images }));
                restoredImagesCount = Object.keys(parsed.images).length;
            }
            alert(`Success! Restored ${restoredFavsCount} favorites and ${restoredImagesCount} images.`);
        } 
        // Fallback for legacy format (just array of favorites)
        else if (Array.isArray(parsed)) {
          setFavorites(new Set(parsed));
          alert(`Imported ${parsed.length} favorites.`);
        } else {
          throw new Error("Unknown format");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to import file. Invalid JSON structure.");
      }
      // Reset input value to allow re-importing same file if needed
      e.target.value = '';
    };
    reader.readAsText(file);
  };

  // Filtering Logic
  const filteredItems = useMemo(() => {
    let items: StyleItem[] = [];
    
    // 1. Flatten items based on category selection
    if (activeCategory === 'all') {
      items = CATEGORIES.flatMap(c => c.items);
    } else {
      const cat = CATEGORIES.find(c => c.id === activeCategory);
      items = cat ? cat.items : [];
    }

    // 2. Filter by Search
    // Search both Name (Chinese) and Prompt (English)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i => 
        i.name.toLowerCase().includes(q) || 
        i.category.toLowerCase().includes(q) ||
        i.prompt.toLowerCase().includes(q)
      );
    }

    // 3. Filter by Favorites Toggle
    if (showFavoritesOnly) {
      items = items.filter(i => favorites.has(i.id));
    }

    return items;
  }, [activeCategory, searchQuery, showFavoritesOnly, favorites]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header 
        onExport={handleExport} 
        onImport={handleImport}
        showFavoritesOnly={showFavoritesOnly}
        toggleShowFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hasApiKey={hasApiKey}
        showEnglishPrompts={showEnglishPrompts}
        toggleLanguage={() => setShowEnglishPrompts(prev => !prev)}
      />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Category Navigation */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
            }`}
          >
            All Styles
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="mb-6 text-sm text-slate-500 flex justify-between items-center">
          <span>Showing {filteredItems.length} styles</span>
          <span>Favorites: {favorites.size}</span>
        </div>

        {/* Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <StyleCard
                key={item.id}
                item={item}
                isFavorite={favorites.has(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
                cachedImage={generatedImages[item.id]}
                onImageGenerated={updateGeneratedImage}
                showEnglishPrompt={showEnglishPrompts}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-xl bg-slate-900/50">
            <p className="text-slate-500 text-lg">No styles found matching your criteria.</p>
            {showFavoritesOnly && (
               <button onClick={() => setShowFavoritesOnly(false)} className="mt-4 text-blue-400 hover:underline">
                 Show all styles
               </button>
            )}
          </div>
        )}
      </main>

      {/* Footer / API Key trigger */}
      <footer className="border-t border-slate-800 bg-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <p className="text-slate-500 text-sm">© 2024 Visual Style Encyclopedia</p>
          {!hasApiKey && (
             <button 
              onClick={handleSelectKey}
              className="flex items-center gap-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded border border-slate-700 transition-colors"
            >
              <Key className="w-3 h-3" />
              Set API Key
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}