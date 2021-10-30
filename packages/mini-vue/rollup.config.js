import { defineConfig } from 'rollup'
import path from 'path'
import pkg from './package.json'
import typescript from 'rollup-plugin-typescript2'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'

const resolve = (...args) => path.resolve(__dirname, ...args)

export default defineConfig({
  input: resolve('src/index.ts'),
  output: [
    {
      name: pkg.name,
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      name: pkg.name,
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    nodeResolve({
      extensions: ['.js', '.ts'],
    }),
    replace({
      'process.env.NODE_ENV': 'development',
    }),
  ],
})
