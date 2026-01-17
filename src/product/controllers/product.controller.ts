import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductFilterDto } from '../dto/product-filter.dto';
import { ProductResponseInterceptor } from '../common/interceptors/response.interceptor';
import {
  ResponseMessage,
  ResponseKey,
} from '../common/decorators/response.decorator';
import { MESSAGES, HTTP_STATUS } from '../constants/messages.constants';

@Controller('products')
@UseInterceptors(ProductResponseInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage(MESSAGES.PRODUCT.CREATED)
  @ResponseKey('product')
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return { product };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(MESSAGES.PRODUCT.PRODUCTS_RETRIEVED)
  async findAll(@Query() filterDto: ProductFilterDto) {
    return await this.productService.findAll(filterDto);
  }

  @Get('featured')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(MESSAGES.PRODUCT.FEATURED_RETRIEVED)
  @ResponseKey('products')
  async getFeatured(@Query('limit') limit?: number) {
    const products = await this.productService.getFeaturedProducts(limit);
    return { products };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(MESSAGES.PRODUCT.PRODUCT_RETRIEVED)
  @ResponseKey('product')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    return { product };
  }

  @Get('slug/:slug')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(MESSAGES.PRODUCT.PRODUCT_RETRIEVED)
  @ResponseKey('product')
  async findBySlug(@Param('slug') slug: string) {
    const product = await this.productService.findBySlug(slug);
    return { product };
  }

  @Get(':id/variants')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(MESSAGES.PRODUCT.VARIANT_RETRIEVED)
  @ResponseKey('variants')
  async getVariants(@Param('id') productId: string) {
    const variants = await this.productService.getProductVariants(productId);
    return { variants };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(MESSAGES.PRODUCT.UPDATED)
  @ResponseKey('product')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.update(id, updateProductDto);
    return { product };
  }

  @Delete(':id')
  @HttpCode(HTTP_STATUS.NO_CONTENT)
  @ResponseMessage(MESSAGES.PRODUCT.DELETED)
  async remove(@Param('id') id: string) {
    await this.productService.remove(id);
    return { success: true };
  }
}
