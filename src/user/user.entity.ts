import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false, unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: false, select: false })
  @Exclude()
  password: string;
}
