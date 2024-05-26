import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { OrderEntity } from './order.entity';

@Entity('Product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: "Purchase Price", type: 'decimal', precision: 10, scale: 2 })
  purprice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sellprice: number;

  @Column({ type: "int", name: "Quantity" })
  qty: number;

  @Column({ name: "Category" })
  ctg: string;

  @ManyToOne(() => CategoryEntity, category => category.products)
  category: CategoryEntity;

  @JoinTable()
  @ManyToMany(() => OrderEntity)
  orders: OrderEntity[];
}
