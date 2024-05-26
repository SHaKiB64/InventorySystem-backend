import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OneToMany } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity("category")
export class Category {
    @PrimaryGeneratedColumn()
    category_id: number;

    @Column()
    category_name: string;

    @OneToMany(() => ProductEntity, productEntity => productEntity.category)
    products: ProductEntity[];
}