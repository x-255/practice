import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { CatDTO } from './cats.dto'
import { CatsService } from './cats.service'

@Controller('cats')
export class CatsController {
  constructor (private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll()
  }

  @Post()
  create(@Body() cat: CatDTO) {
    return this.catsService.create(cat)
  }

  @Get('vip-cats')
  async findVipCats() {
    throw new ForbiddenException()
  }

  @Get(':index')
  findIndex(@Param('index', ParseIntPipe) index: number) {
    console.log(typeof index)
    return this.catsService.findIndex(index)
  }
}
