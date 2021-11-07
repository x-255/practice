import { defineConfig } from 'rollup'
import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'

export default defineConfig({
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
    {
      file: pkg.browser,
      format: 'iife',
      sourcemap: true,
      name: 'miniVue',
    },
  ],
  plugins: [nodeResolve(), babel()],
})
