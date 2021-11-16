import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('phone')
export class PhoneEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  cellphone: string;
}
