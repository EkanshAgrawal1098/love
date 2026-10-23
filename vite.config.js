import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' makes the built site work from any folder or sub-path (Netlify, GitHub Pages, a USB stick...).
export default defineConfig({
  base: './',
  plugins: [react()],
});
