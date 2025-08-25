import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/number-sequence-analyzer/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
