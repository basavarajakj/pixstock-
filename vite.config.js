// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        src: resolve(__dirname, 'src/pages/photos/photos.html'),
        // src: resolve(__dirname, 'src/pages/videos/videos.html'),
      },
    },
  },
})