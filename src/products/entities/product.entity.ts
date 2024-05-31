import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ProductImage } from './product-image.entity';
import { User } from '../../auth/entities/user.entity';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: 'dc5e9a65-17e6-4e72-9b10-844ac7e93be8',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Rustic Cotton Hat',
    description: 'Title of product',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({
    example: 0,
    description: 'Product price',
  })
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({
    example:
      'Veniam ullamco ea irure sunt magna quis quis laborum. Amet consectetur nisi dolore sunt commodo. Ullamco fugiat dolore exercitation in excepteur sunt et quis esse cupidatat aute.',
    description: 'Product description',
    nullable: true,
    required: false,
  })
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty({
    example: 'rustic-cotton-hat',
    description: 'Slug of product',
    uniqueItems: true,
    required: false,
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({
    example: 0,
    description: 'Product stock',
    default: 0,
    required: false,
  })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({
    example: ['S', 'M', 'L'],
    description: 'Sizes of product',
    isArray: true,
    type: [String],
  })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    example: 'man',
    description: 'Gender of product',
  })
  @Column('text')
  gender: string;

  @ApiProperty({
    example: ['fire', 'food'],
    description: 'Tags of product',
    isArray: true,
  })
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ApiProperty({
    example: ['http://placeimg.com/640/480', 'http://placeimg.com/640/480'],
    description: 'Images of product',
    isArray: true,
  })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ApiProperty({ description: 'User object' })
  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll("'", '');
  }
}
