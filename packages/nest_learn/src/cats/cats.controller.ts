import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service'
import { Cat } from './cat.interface'

@Controller('cats')
export class CatsController {
  constructor (private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll()
  }

  @Post()
  create(@Body() cat: Cat) {
    return this.catsService.create(cat)
  }
}
