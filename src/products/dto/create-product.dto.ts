import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Product title', minLength: 1 })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({ description: 'Product price' })
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiProperty({
    description: 'Product description',
    required: false,
    default: null,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Product slug',
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    description: 'Product stock',
    default: 0,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    description: 'Product size',
    isArray: true,
    type: [String],
  })
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty()
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
