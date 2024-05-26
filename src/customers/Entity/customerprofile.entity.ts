import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Matches, MaxLength } from "class-validator";
import { CustomerEntity } from './customer.entity';

@Entity("Customer Profile")
export class CustomerProfileEntity {
  @PrimaryGeneratedColumn()
  profile_id: number;

  @ManyToOne(() => CustomerEntity, customer => customer.profiles)
  @JoinColumn({ name: 'user_id' })
  user: CustomerEntity;
  
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Matches(/^[a-zA-Z]+$/)
  @Column()
  FirstName: string;
  
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Matches(/^[a-zA-Z]+$/)
  @Column()
  LastName: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  HouseNumber: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  street: string;
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @Column()
  city: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @Column()
  divition: string;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  postalCode: Number;
  
  @IsPhoneNumber()
  @Column()
  phoneNumber: string;
}
