import { Injectable } from '@nestjs/common'
import { Cat } from './cats.interface'

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat)
    return 'success'
  }

  findAll() {
    return this.cats
  }

  findIndex(i: number) {
    return this.cats[i]
  }
}
