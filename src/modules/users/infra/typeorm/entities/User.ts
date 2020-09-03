import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import uploadConfig from '@config/upload'
import { IDV_APP_API_URL } from '@shared/utils/environment'

import { Expose, Exclude } from 'class-transformer'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  @Exclude()
  password: string

  @Column({
    nullable: true
  })
  @Exclude()
  avatar: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${IDV_APP_API_URL}/files/${this.avatar}`
      default:
        return null
    }
  }
}

export default User
