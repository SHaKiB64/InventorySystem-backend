// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { OrderEntity } from './order.entity';
// import { ProductEntity } from './product.entity';

// @Entity('OrderProduct')
// export class OrderProductEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => OrderEntity, order => order.orderProducts)
//   order: OrderEntity;

//   @ManyToOne(() => ProductEntity, product => product.orderProducts)
//   product: ProductEntity;

//   @Column()
//   quantity: number;
// }
