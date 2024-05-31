// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger'; // para documentar con swagger
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
