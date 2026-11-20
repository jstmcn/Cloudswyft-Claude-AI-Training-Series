import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' makes the built dist/ folder work from any sub-path
// (Netlify, GitHub Pages project sites, or a local static server).
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { port: 5173, open: false },
});
