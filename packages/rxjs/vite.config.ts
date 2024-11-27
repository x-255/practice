import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      'api': '/src/api'
    }
  }
})