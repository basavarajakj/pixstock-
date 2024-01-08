// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        photos: resolve(__dirname, 'src/pages/photos/photos.html'),
        photosDetails: resolve(__dirname, 'src/pages/photos/photo_detail.html'),
      },
    },
  },
})