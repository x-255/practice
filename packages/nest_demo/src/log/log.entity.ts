import { User } from "src/user/user.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  result: number

  @Column()
  path: string

  @Column()
  method: string

  @Column()
  data: string

  @ManyToOne(() => User, user => user.logs)
  user: User
}