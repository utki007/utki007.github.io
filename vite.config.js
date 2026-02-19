import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base '/' for GitHub Pages user site (https://utki007.github.io/)
export default defineConfig({
  plugins: [react()],
  base: '/',
})
