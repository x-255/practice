import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service'
import { ConfigService } from '@nestjs/config'
import { User } from './user.entity'

@Controller('users')
export class UserController {
  constructor(private userService: UserService, private configService: ConfigService) {}

  @Get()
  findUsers() {
    return this.userService.findAll()
  }

  @Get(':id')
  findUser(@Param('id') id: number) {
    return this.userService.findOne(id)
  }

  @Get('/profile/:id')
  findUserProfile(@Param('id') id: number) {
    return this.userService.findProfile(id)
  }

  @Get('/logs/:id')
  findUserLogs(@Param('id') id: number) {
    return this.userService.findUserLogs(id)
  }

  @Get('/logsByGroup/:id')
  findUserLogsByGroup(@Param('id') id: number) {
    return this.userService.findUserLogsByGroup(id)
  }

  @Post()
  addUser(@Body() user: User) {
    return this.userService.create(user)
  }

  @Put()
  updateUser(@Body() user: Partial<User>) {
    return this.userService.update(user)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id)
  }
}
