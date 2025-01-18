import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { LogModule } from 'src/log/log.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), LogModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
