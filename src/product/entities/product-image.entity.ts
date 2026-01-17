import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { ProductVariant } from './product-variant.entity';
import { Exclude } from 'class-transformer';

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  product: Product;

  @ManyToOne(() => ProductVariant, (variant) => variant.images, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  product_variant: ProductVariant;

  @Column({ type: 'text' })
  image_url: string;

  @Column({ type: 'boolean', default: false })
  is_primary: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  alt_text: string;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}
