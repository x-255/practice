import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LogService } from './log.service'
import { Log } from './log.entity'

@Controller('logs')
export class LogController {
  constructor(private logService: LogService) {}

  @Get()
  findAll() {
    return this.logService.findAll()
  }

  @Post()
  create(@Body() log: Partial<Log>) {
    return this.logService.create(log)
  }
}
