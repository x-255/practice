import { Injectable } from '@nestjs/common'
import { Cat } from './cat.interface'

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat)
  }

  findAll() {
    return this.cats
  }

  findIndex(i: number) {
    return this.cats[i]
  }
}
