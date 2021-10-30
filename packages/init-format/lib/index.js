const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const prettierConfig = {
  semi: false,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
}

const vsConfig = {
  'editor.formatOnSave': true,
}

const getPath = (file) => path.resolve(process.cwd(), file)

const hasFileInCwd = async (file) => {
  const path = getPath(file)
  const accessP = promisify(fs.access)
  let has = await accessP(path, fs.constants.F_OK)
  return has
}

const createFile = (file, content) => {
  hasFileInCwd(file).catch(() => {
    const pathArr = file.replace(process.cwd() + '/', '').split('/')
    pathArr.forEach((p, i) => {
      let path = getPath(pathArr.slice(0, ++i).join('/'))
      if (i === pathArr.length) fs.writeFileSync(path, content)
      else fs.mkdirSync(path)
    })
  })
}

createFile('.prettierrc', JSON.stringify(prettierConfig))
createFile('.vscode/settings.json', JSON.stringify(vsConfig))
