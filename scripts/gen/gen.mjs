import 'zx/globals'

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const portRange = [8000, 9000]

export class GenCreator {
  constructor(name) {
    this.port = getRandomInt(...portRange)
    this.name = name
    this.scripts = {}
    this.path = path.resolve(__dirname, '../../packages/', name)
  }

  createPackageJson() {}
  createFiles() {}
  install() {}
}

function addScripts(creator) {
  const pkgPath = path.resolve(__dirname, '../../package.json')
  const pkg = fs.readFileSync(pkgPath, 'utf-8')
  const pkgObj = JSON.parse(pkg)
  pkgObj.scripts = {
    ...pkgObj.scripts,
    ...creator.scripts,
  }
  console.log(111111)
  fs.writeFileSync(pkgPath, JSON.stringify(pkgObj, null, 2))
}

export async function runCreator(Creator, name) {
  const c = new Creator(name)
  await c.createFiles()
  await c.createPackageJson()
  await c.install()
  await addScripts(c)
}
