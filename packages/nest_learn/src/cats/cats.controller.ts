import { Body, Controller, ForbiddenException, Get, HttpException, HttpStatus, Param, Post, UseFilters } from '@nestjs/common';
import { CatsService } from './cats.service'
import { Cat } from './cat.interface'
import { HttpExceptionFilter } from 'src/filter/http-exception.filter'

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

  @Get('vip-cats')
  async findVipCats() {
    throw new ForbiddenException()
  }

  @Get(':id')
  findIndex(@Param('id') id: number) {
    return this.catsService.findIndex(id)
  }
}
