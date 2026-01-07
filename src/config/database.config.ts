import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Product],
  synchronize: true,
  // autoLoadEntities: true,
};
