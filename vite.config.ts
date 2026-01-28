import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 設定 GitHub Pages 的專案路徑，確保 CSS/JS 能正確載入
  base: '/Visual-Style-Encyclopedia/',
  build: {
    outDir: 'dist',
  },
  define: {
    'process.env': {} 
  }
});