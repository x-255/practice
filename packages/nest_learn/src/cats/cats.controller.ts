import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get(':id')
  findIndex(@Param('id') id: number) {
    return this.catsService.findIndex(id)
  }
}
