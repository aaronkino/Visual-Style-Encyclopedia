import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Crucial for GitHub Pages
  build: {
    outDir: 'dist',
  },
  define: {
    // This prevents "Uncaught ReferenceError: process is not defined" in the browser
    'process.env': {} 
  }
});