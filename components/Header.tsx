import React from 'react';
import { Download, Upload, Heart, Search, Languages } from 'lucide-react';

interface HeaderProps {
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showFavoritesOnly: boolean;
  toggleShowFavorites: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  hasApiKey: boolean;
  showEnglishPrompts: boolean;
  toggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onExport, 
  onImport, 
  showFavoritesOnly, 
  toggleShowFavorites,
  searchQuery,
  setSearchQuery,
  hasApiKey,
  showEnglishPrompts,
  toggleLanguage
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo / Title */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-500 to-violet-600 p-2 rounded-lg">
              <span className="text-2xl">🎨</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">Visual Style Encyclopedia</h1>
              <p className="text-xs text-slate-400">Gemini Powered Art Styles</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={showEnglishPrompts ? "Search prompts..." : "搜尋風格..."}
              className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg leading-5 bg-slate-800 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
             <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                showEnglishPrompts
                  ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle Prompt Language (CN/EN)"
            >
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline w-6 text-center">{showEnglishPrompts ? 'EN' : 'CN'}</span>
            </button>

             <button
              onClick={toggleShowFavorites}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                showFavoritesOnly
                  ? 'bg-rose-500/10 border-rose-500/50 text-rose-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="Show Favorites Only"
            >
              <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">Favorites</span>
            </button>

            <div className="h-6 w-px bg-slate-700 mx-1 hidden sm:block"></div>

            <div className="flex gap-1">
              <button
                onClick={onExport}
                className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-blue-400 transition-colors"
                title="Export Favorites"
              >
                <Download className="w-5 h-5" />
              </button>
              
              <label className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-green-400 transition-colors cursor-pointer" title="Import Favorites">
                <Upload className="w-5 h-5" />
                <input type="file" accept=".json" onChange={onImport} className="hidden" />
              </label>
            </div>
          </div>
        </div>
        
        {!hasApiKey && (
          <div className="mt-4 p-2 bg-amber-500/10 border border-amber-500/20 rounded text-center text-xs text-amber-200">
            ⚠ No API Key detected. Image generation will not work. Please set your API Key via the button in the footer or environment.
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;