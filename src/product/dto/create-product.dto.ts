import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UnitType } from '../entities/product-variant.entity';

class ProductVariantDto {
  @IsString()
  @IsNotEmpty()
  variant_name: string;

  @IsEnum(UnitType)
  unit_type: UnitType;

  @IsNumber()
  @Min(0)
  unit_value: number;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @Min(0)
  sale_price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  compare_at_price?: number;

  @IsNumber()
  @Min(0)
  stock_quantity: number;

  @IsBoolean()
  @IsOptional()
  is_primary?: boolean;
}

class ProductImageDto {
  @IsString()
  @IsNotEmpty()
  image_url: string;

  @IsBoolean()
  @IsOptional()
  is_primary?: boolean;

  @IsString()
  @IsOptional()
  alt_text?: string;

  @IsNumber()
  @IsOptional()
  sort_order?: number;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsOptional()
  short_description?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  category_ids?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  variants: ProductVariantDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  @IsOptional()
  images?: ProductImageDto[];
}
