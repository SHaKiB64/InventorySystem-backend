import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CustomerEntity } from './customer.entity'; 
@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @ManyToOne(() => CustomerEntity)
  customer: CustomerEntity;

  @ManyToMany(() => ProductEntity, product => product.carts)
  @JoinTable()
  products: ProductEntity[];
}
