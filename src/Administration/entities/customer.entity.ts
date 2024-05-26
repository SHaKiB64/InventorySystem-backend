import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('Customer')
export class CustomerEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'Name', nullable: false })
  name: string;

  @Column({ name: 'Email', nullable: false })
  email: string;

  @Column()
  filename: string;

  @Column({ name: 'Password', nullable: false })
  password: string;

  @Column({ name: 'Phone', nullable: true })
  phone: string;

  @OneToMany(() => OrderEntity, (order) => order.customer)
  orders: OrderEntity[];
}
