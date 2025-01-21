import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common'
import { LogService } from './log.service'
import { Log } from './log.entity'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'

@Controller('logs')
export class LogController {
  constructor(
    private logService: LogService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  @Get()
  findAll() {
    this.logger.info('Finding all logs')
    return this.logService.findAll()
  }

  @Post()
  create(@Body() log: Partial<Log>) {
    return this.logService.create(log)
  }
}
