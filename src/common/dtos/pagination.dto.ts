import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    default: 10,
    description: 'How many rows do you need',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number) // Transformar dato a number
  limit?: number;

  @ApiProperty({
    default: 0,
    description: 'How many rows do you wont to skip',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number) // Transformar dato a number
  offset?: number;
}
