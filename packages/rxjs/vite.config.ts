import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  resolve: {
    alias: {
      'api': '/src/api'
    }
  },
  plugins: [
    UnoCSS(),
  ],
})