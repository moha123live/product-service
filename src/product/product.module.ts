import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductImage } from './entities/product-image.entity';
import { Category } from './entities/category.entity';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { ProductResponseInterceptor } from './common/interceptors/response.interceptor'; 
import { ProductExceptionFilter } from './common/filters/product-exception.filter';
@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductVariant, ProductImage, Category]),
  ],
  controllers: [ProductController, CategoryController],
  providers: [
    ProductService,
    CategoryService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ProductResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ProductExceptionFilter,
    },
  ],
  exports: [ProductService, CategoryService, TypeOrmModule],
})
export class ProductModule {}
