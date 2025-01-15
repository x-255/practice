import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import configuration from 'src/configuration'
import { UserModule } from './user/user.module'
import { User } from './user/user.entity'
import { Profile } from './user/profile.entity'
import { Log } from './log/log.entity'
import { Role } from './role/role.entity'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory (configService: ConfigService) {
        const dbConfig = configService.get('db')
        return {
          ...dbConfig,
          logging: ['error'],
          entities: [User, Profile, Log, Role],
        }
      }
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
