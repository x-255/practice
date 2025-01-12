import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service'
import { ConfigService } from '@nestjs/config'

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private configService: ConfigService) {}

  @Get()
  getUsers() {
    console.log(this.configService.get('db'))
    return this.userService.getUsers()
  }
}
