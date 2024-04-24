const fs = require('fs/promises')
const path = require('path')

const prettierConfig = {
  semi: false,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
}

const vsConfig = {
  'editor.formatOnSave': true,
}

const stringify = (val) => JSON.stringify(val, null, 2)

const resolveCwdPath = (...args) => path.resolve(process.cwd(), ...args)

const writeJsonFile = (path, json) => fs.writeFile(path, stringify(json))

function createPritterConfig() {
  const configPath = resolveCwdPath('.prettierrc')
  writeJsonFile(configPath, prettierConfig)
}

async function createVsConfig() {
  const dir = resolveCwdPath('.vscode')
  await fs.access(dir).catch(() => fs.mkdir(dir))
  const configPath = path.resolve(dir, 'settings.json')
  let content = vsConfig
  try {
    await fs.access(configPath)
    let oldContent = await fs.readFile(configPath, 'utf-8')
    if (oldContent) {
      oldContent = JSON.parse(oldContent)
      content = { ...oldContent, ...vsConfig }
    }
  } catch (err) {}
  writeJsonFile(configPath, content)
}

createPritterConfig()
createVsConfig()
