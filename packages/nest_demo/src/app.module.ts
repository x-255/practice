import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import configuration from 'src/configuration'
import { Log } from './log/log.entity'
import { LogModule } from './log/log.module'
import { Role } from './role/role.entity'
import { Profile } from './user/profile.entity'
import { User } from './user/user.entity'
import { UserModule } from './user/user.module'
import { utilities, WinstonModule } from 'nest-winston'
import { format, transports } from 'winston'
import 'winston-daily-rotate-file'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from './filters/http-exception-filter'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const dbConfig = configService.get('db')
        return {
          ...dbConfig,
          logging: process.env.NODE_ENV === 'development' ? false : ['error'],
          entities: [User, Profile, Log, Role],
        }
      },
    }),
    WinstonModule.forRoot({
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            utilities.format.nestLike()
          ),
        }),
        new transports.DailyRotateFile({
          dirname: 'logs',
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d'
        })
      ],
    }),
    UserModule,
    LogModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
