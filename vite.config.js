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
        video: resolve(__dirname, 'src/pages/videos/videos.html'),
        videoDetails: resolve(__dirname, 'src/pages/videos/video_detail.html'),
        collection: resolve(__dirname, 'src/pages/collections/collection.html'),
        collectionDetails: resolve(__dirname, 'src/pages/collections/collection_detail.html'),
        favorite: resolve(__dirname, 'src/pages/favorite/favorite.html'),
      },
    },
  },
})