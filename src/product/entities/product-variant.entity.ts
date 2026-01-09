import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { Product } from './product.entity';
import { ProductImage } from './product-image.entity';

export enum UnitType {
  KG = 'kg',
  G = 'g',
  L = 'l',
  ML = 'ml',
  PACKS = 'packs',
  PCS = 'pcs',
  UNITS = 'units',
}

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column({ type: 'varchar', length: 100 })
  variant_name: string; // "1 kg", "2 kg"

  @Column({ type: 'enum', enum: UnitType, default: UnitType.UNITS })
  unit_type: UnitType;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  unit_value: number; // 1, 2, 5

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100, unique: true })
  sku: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sale_price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  compare_at_price: number;

  @Column({ type: 'int', default: 0 })
  stock_quantity: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  is_primary: boolean;

  @OneToMany(() => ProductImage, (image) => image.product_variant)
  images: ProductImage[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
