import { log } from "console"
import { Log } from "src/log/log.entity"
import { Role } from "src/role/role.entity"
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToMany, JoinTable } from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @OneToMany(() => Log, log => log.user)
  logs: Log[]

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({ name: 'users_roles' })
  roles: Role[]
}