import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
  Max,
  Matches,
  IsEnum,
  ArrayMinSize,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UnitType } from '../entities/product-variant.entity';
import { MESSAGES } from '../constants/messages.constants';
import { VALIDATION } from '../constants/validation.constants';

export class ProductVariantDto {
  @IsString()
  @IsNotEmpty({ message: MESSAGES.VALIDATION.VARIANT_REQUIRED })
  variant_name: string;

  @IsEnum(UnitType, {
    message: MESSAGES.VALIDATION.UNIT_TYPE_INVALID,
  })
  unit_type: UnitType;

  @IsNumber()
  @Min(VALIDATION.VARIANT.UNIT_VALUE_MIN)
  @Max(VALIDATION.VARIANT.UNIT_VALUE_MAX)
  unit_value: number;

  @IsString()
  @IsNotEmpty()
  @Matches(VALIDATION.VARIANT.SKU_PATTERN, {
    message: MESSAGES.VALIDATION.SKU_INVALID,
  })
  @MinLength(VALIDATION.VARIANT.SKU_MIN_LENGTH)
  @MaxLength(VALIDATION.VARIANT.SKU_MAX_LENGTH)
  sku: string;

  @IsNumber()
  @Min(VALIDATION.VARIANT.PRICE_MIN, {
    message: MESSAGES.VALIDATION.PRICE_INVALID,
  })
  @Max(VALIDATION.VARIANT.PRICE_MAX)
  sale_price: number;

  @IsOptional()
  @IsNumber()
  @Min(VALIDATION.VARIANT.PRICE_MIN)
  @Max(VALIDATION.VARIANT.PRICE_MAX)
  compare_at_price?: number;

  @IsNumber()
  @Min(VALIDATION.VARIANT.STOCK_MIN, {
    message: MESSAGES.VALIDATION.STOCK_INVALID,
  })
  @Max(VALIDATION.VARIANT.STOCK_MAX)
  stock_quantity: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsBoolean()
  @IsOptional()
  is_primary?: boolean;
}

export class ProductImageDto {
  @IsString()
  @IsNotEmpty({ message: MESSAGES.VALIDATION.IMAGE_URL_REQUIRED })
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
  @IsNotEmpty({ message: MESSAGES.VALIDATION.NAME_REQUIRED })
  @MinLength(VALIDATION.PRODUCT.NAME_MIN_LENGTH)
  @MaxLength(VALIDATION.PRODUCT.NAME_MAX_LENGTH)
  name: string;

  @IsString()
  @IsNotEmpty({ message: MESSAGES.VALIDATION.SLUG_REQUIRED })
  @Matches(VALIDATION.PRODUCT.SLUG_PATTERN, {
    message: MESSAGES.VALIDATION.SLUG_INVALID,
  })
  @MinLength(VALIDATION.PRODUCT.SLUG_MIN_LENGTH)
  @MaxLength(VALIDATION.PRODUCT.SLUG_MAX_LENGTH)
  slug: string;

  @IsString()
  @IsOptional()
  @MaxLength(VALIDATION.PRODUCT.SHORT_DESCRIPTION_MAX_LENGTH)
  short_description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(VALIDATION.PRODUCT.DESCRIPTION_MAX_LENGTH)
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
  @ArrayMinSize(1, { message: MESSAGES.VALIDATION.VARIANT_REQUIRED })
  @Type(() => ProductVariantDto)
  variants: ProductVariantDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  @IsOptional()
  images?: ProductImageDto[];
}
