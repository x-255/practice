import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { LogService } from 'src/log/log.service'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private logService: LogService
  ) {}

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } })
  }

  findProfile(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    })
  }

  async findUserLogs(id: number) {
    const user = await this.findOne(id)
    return this.logService.findLogsByUser(user)
  }

  findUserLogsByGroup(id: number) {
    return this.logService.findLogsByGroup(id)
  }

  async create(user: User) {
    const u = this.userRepository.create(user)
    return this.userRepository.save(u)
  }

  update(user: Partial<User>) {
    return this.userRepository.update(user.id, user)
  }

  delete(id: number) {
    return this.userRepository.delete(id)
  }
}
