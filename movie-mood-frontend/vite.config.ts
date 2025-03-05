import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    devSourcemap: true
  },
  preview: {
    host: '0.0.0.0',
    port: 3048,
    strictPort: true,
    allowedHosts: ['mmf.omdev.tech', 'api.mmf.omdev.tech', 'localhost']
  },
  server: {
    host: '0.0.0.0',
    port: 3048,
    strictPort: true
  }
})
