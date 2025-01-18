import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Log } from './log.entity'
import { UserService } from 'src/user/user.service'
import { User } from 'src/user/user.entity'

@Injectable()
export class LogService {
  constructor(@InjectRepository(Log) private logRepository: Repository<Log>) {}

  findAll() {
    return this.logRepository.find()
  }

  findLogsByUser(user: User) {
    return this.logRepository.find({
      where: { user },
    })
  }

  findLogsByGroup(userId: number) {
    return this.logRepository
      .createQueryBuilder('logs')
      .select('logs.result', 'result')
      .addSelect('count(result)', 'count')
      .leftJoinAndSelect('logs.user', 'user')
      .where('user.id = :userId', { userId })
      .groupBy('result')
      .orderBy('count', 'DESC')
      .getRawMany()
  }

  create(log: Partial<Log>) {
    const l = this.logRepository.create(log)
    return this.logRepository.save(l)
  }
}
