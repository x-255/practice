import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Log } from './log.entity'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  exports: [LogService],
  controllers: [LogController],
  providers: [LogService]
})
export class LogModule {}
