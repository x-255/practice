import 'reflect-metadata'

function logType(target: any, key: string) {
  const t = Reflect.getMetadata('design:type', target, key)
  console.log(`${key} type: ${t.name}`) // 会打印出 attr1 type: String
}

class Demo {
  @logType
  public attr1: string = '1'
}
