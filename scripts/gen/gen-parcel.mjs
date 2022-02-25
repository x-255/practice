import 'zx/globals'
import { GenCreator } from './gen.mjs'

export class ParcelCreator extends GenCreator {
  constructor(name) {
    super(name)
    this.scripts = {
      [`dev:${name}`]: `cd packages/${name} && npm run dev ${this.port}`,
    }
  }

  createPackageJson() {
    const json = {
      name: `@practice/${this.name}`,
      version: '1.0.0',
      description: '',
      main: 'index.ts',
      scripts: {
        dev: 'parcel index.html --port',
      },
      keywords: [],
      author: '',
      license: 'ISC',
    }

    fs.writeFileSync(
      path.resolve(this.path, 'package.json'),
      JSON.stringify(json, null, 2)
    )
  }

  async createFiles() {
    cd(this.path)
    await $`touch index.html`
    await fs.writeFile(
      'index.html',
      `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="../../favicon.ico" type="image/x-icon" />
    <title>${this.name}</title>
  </head>
  <body>
    <div id="app"></div>

    <script src="./src/index.ts"></script>
  </body>
</html>`
    )

    await $`mkdir src`
    cd('src')
    await $`touch index.ts`
  }

  install() {
    cd(path.resolve(__dirname, '../../'))
    $`pnpm install -r --filter @practice/${this.name} -D @babel/core @babel/plugin-transform-runtime @babel/preset-env`
  }
}
