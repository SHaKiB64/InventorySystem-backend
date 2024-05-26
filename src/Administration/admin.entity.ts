import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';

@Entity('Admin')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  filename: string;

  @Column({ default: true })
  isActive: boolean;

  @BeforeInsert()
  generateRandomNumber() {
    // Random ID generation logic if needed
    // this.id = Math.floor(Math.random() * 1000);
  }
}
