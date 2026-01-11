import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { ProductVariant } from 'src/product/entities/product-variant.entity';
import { ProductImage } from 'src/product/entities/product-image.entity';
import { Category } from 'src/product/entities/category.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Product, ProductVariant, ProductImage, Category],
  synchronize: true,
  // autoLoadEntities: true,
};
