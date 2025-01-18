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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory (configService: ConfigService) {
        const dbConfig = configService.get('db')
        return {
          ...dbConfig,
          logging: process.env.NODE_ENV === 'development' ? true : ['error'],
          entities: [User, Profile, Log, Role],
        }
      }
    }),
    UserModule,
    LogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
