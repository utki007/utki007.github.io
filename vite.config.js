import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base './' for GitHub Pages - relative paths avoid 404s on asset loading
export default defineConfig({
  plugins: [react()],
  base: './',
})
