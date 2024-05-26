import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Category } from './category.entity';
import { CartEntity } from './cart.entity';
import { OrderEntity } from './order.entity';


@Entity("product")
export class ProductEntity {
    @PrimaryGeneratedColumn()
    product_id: number;

    @Column()
    product_name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @ManyToOne(() => Category, category => category.products)
    category: Category;

    @ManyToOne(() => OrderEntity, order => order.products)
    order: OrderEntity;
    
    @ManyToMany(() => CartEntity, cart => cart.products)
    @JoinTable()
    carts: CartEntity[];

}