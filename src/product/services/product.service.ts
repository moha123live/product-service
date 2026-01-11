import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductVariant } from '../entities/product-variant.entity';
import { Category } from '../entities/category.entity';
import { ProductImage } from '../entities/product-image.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductFilterDto } from '../dto/product-filter.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductVariant)
    private variantRepository: Repository<ProductVariant>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(ProductImage)
    private imageRepository: Repository<ProductImage>,
  ) {}

  getStatus(): string {
    return 'Product Service is running';
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Check if slug exists
    const existingProduct = await this.productRepository.findOne({
      where: { slug: createProductDto.slug },
    });

    if (existingProduct) {
      throw new ConflictException('Product with this slug already exists');
    }

    // Check SKU uniqueness for variants
    const skus = createProductDto.variants.map((v) => v.sku);
    const existingVariants = await this.variantRepository.find({
      where: { sku: In(skus) },
    });

    if (existingVariants.length > 0) {
      throw new ConflictException(
        `SKUs already exist: ${existingVariants.map((v) => v.sku).join(', ')}`,
      );
    }

    const product = this.productRepository.create({
      name: createProductDto.name,
      slug: createProductDto.slug,
      short_description: createProductDto.short_description,
      description: createProductDto.description,
      is_active: createProductDto.is_active ?? true,
    });

    // Handle categories
    if (createProductDto.category_ids?.length) {
      const categories = await this.categoryRepository.find({
        where: { id: In(createProductDto.category_ids) },
      });
      product.categories = categories;
    }

    // Handle variants
    const variants = createProductDto.variants.map((variantData) =>
      this.variantRepository.create({
        ...variantData,
        is_active: variantData.is_active ?? true,
      }),
    );
    product.variants = variants;

    // Handle images
    if (createProductDto.images?.length) {
      const images = createProductDto.images.map((imageData) =>
        this.imageRepository.create(imageData),
      );
      product.images = images;
    }

    return await this.productRepository.save(product);
  }

  async findAll(filters: ProductFilterDto): Promise<{
    data: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const {
      search,
      categories,
      min_price,
      max_price,
      in_stock,
      sort_by = 'created_at',
      order = 'DESC',
      page = 1,
      limit = 20,
    } = filters;

    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'categories')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('product.images', 'images')
      .where('product.is_active = :isActive', { isActive: true })
      .andWhere('variants.is_active = :variantActive', { variantActive: true });

    // Apply search filter
    if (search) {
      query.andWhere(
        '(product.name ILIKE :search OR product.description ILIKE :search OR product.short_description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Apply category filter
    if (categories?.length) {
      query.andWhere('categories.id IN (:...categoryIds)', {
        categoryIds: categories,
      });
    }

    // Apply price filter
    if (min_price !== undefined || max_price !== undefined) {
      const priceConditions: string[] = [];
      const params: Record<string, number> = {};

      if (min_price !== undefined) {
        priceConditions.push('variants.sale_price >= :min_price');
        params.min_price = min_price;
      }

      if (max_price !== undefined) {
        priceConditions.push('variants.sale_price <= :max_price');
        params.max_price = max_price;
      }

      query.andWhere(`(${priceConditions.join(' AND ')})`, params);
    }

    // Apply stock filter
    if (in_stock !== undefined) {
      query.andWhere('variants.stock_quantity > 0');
    }

    // Apply sorting
    if (sort_by === 'price') {
      query.orderBy('variants.sale_price', order);
    } else {
      query.orderBy(`product.${sort_by}`, order);
    }

    // Get total count
    const total = await query.getCount();

    // Apply pagination
    const skip = (page - 1) * limit;
    query.skip(skip).take(limit);

    const data = await query.getMany();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categories', 'variants', 'images'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { slug },
      relations: ['categories', 'variants', 'images'],
    });

    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    // Update product fields
    Object.assign(product, updateProductDto);

    // Handle category updates
    if (updateProductDto.category_ids) {
      const categories = await this.categoryRepository.find({
        where: { id: In(updateProductDto.category_ids) },
      });
      product.categories = categories;
    }

    // Handle image deletions
    if (updateProductDto.images_to_delete?.length) {
      await this.imageRepository.delete({
        id: In(updateProductDto.images_to_delete),
        product: { id },
      });
    }

    // Handle variant updates (simplified - in production you might need more complex logic)
    if (updateProductDto.variants) {
      // Delete existing variants and create new ones
      await this.variantRepository.delete({ product: { id } });

      const variants = updateProductDto.variants.map((variantData) =>
        this.variantRepository.create({
          ...variantData,
          product,
          is_active: variantData.is_active ?? true,
        }),
      );
      product.variants = variants;
    }

    // Handle image updates
    if (updateProductDto.images) {
      // Delete existing images and create new ones
      await this.imageRepository.delete({ product: { id } });

      const images = updateProductDto.images.map((imageData) =>
        this.imageRepository.create({
          ...imageData,
          product,
        }),
      );
      product.images = images;
    }

    return await this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async updateStock(
    variantId: string,
    quantity: number,
  ): Promise<ProductVariant> {
    const variant = await this.variantRepository.findOne({
      where: { id: variantId },
    });

    if (!variant) {
      throw new NotFoundException(`Variant with ID ${variantId} not found`);
    }

    variant.stock_quantity = quantity;
    variant.is_active = quantity > 0;

    return await this.variantRepository.save(variant);
  }

  async getProductVariants(productId: string): Promise<ProductVariant[]> {
    return await this.variantRepository.find({
      where: { product: { id: productId } },
      relations: ['images'],
    });
  }

  async getFeaturedProducts(limit: number = 10): Promise<Product[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('product.images', 'images')
      .where('product.is_active = :isActive', { isActive: true })
      .andWhere('variants.is_primary = :isPrimary', { isPrimary: true })
      .andWhere('variants.is_active = :variantActive', { variantActive: true })
      .orderBy('product.created_at', 'DESC')
      .limit(limit)
      .getMany();
  }
}
