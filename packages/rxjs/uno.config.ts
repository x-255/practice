import { defineConfig } from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        // 默认
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // 包括 ts 文件
        './src/**/*.{ts}',
      ],
    },
  },
})