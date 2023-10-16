import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { IsNotEmpty } from 'class-validator';
  
  @Entity('pages')
  export class Page {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @IsNotEmpty()
    title: string;
  
    @Column()
    @IsNotEmpty()
    slug: string;
  
    @Column('text') 
    @IsNotEmpty()
    content: string;
  
    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
  }
  

