#!/usr/bin/env zx

import 'zx/globals'
import inquirer from 'inquirer'
import { runCreator } from './gen.mjs'
import { ParcelCreator } from './gen-parcel.mjs'

const { name, tool } = await inquirer.prompt([
  {
    name: 'name',
    message: '请输入包的名字',
    validate(val) {
      if (val) {
        return true
      }
      console.log(chalk.yellow('name 不能为空'))
    },
  },
  {
    type: 'list',
    name: 'tool',
    message: '请输入打包工具',
    choices: ['parcel'],
  },
])

const packageDir = path.resolve(__dirname, '../../packages/')
cd(packageDir)
await $`mkdir ${name}`
cd(name)

if (tool === 'parcel') {
  runCreator(ParcelCreator, name)
}
