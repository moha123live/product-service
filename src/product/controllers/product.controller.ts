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
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductFilterDto } from '../dto/product-filter.dto';
import { ResponseMessage } from '../common/decorators/response.decorator';
import { MESSAGES } from '../constants/messages.constants';

@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage(MESSAGES.PRODUCT.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(MESSAGES.PRODUCT.PRODUCTS_RETRIEVED)
  findAll(@Query() filterDto: ProductFilterDto) {
    return this.productService.findAll(filterDto);
  }

  @Get('featured')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(MESSAGES.PRODUCT.FEATURED_RETRIEVED)
  getFeatured(@Query('limit') limit?: number) {
    return this.productService.getFeaturedProducts(limit);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(MESSAGES.PRODUCT.PRODUCT_RETRIEVED)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get('slug/:slug')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(MESSAGES.PRODUCT.PRODUCT_RETRIEVED)
  findBySlug(@Param('slug') slug: string) {
    return this.productService.findBySlug(slug);
  }

  @Get(':id/variants')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(MESSAGES.PRODUCT.VARIANT_RETRIEVED)
  getVariants(@Param('id') productId: string) {
    return this.productService.getProductVariants(productId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage(MESSAGES.PRODUCT.UPDATED)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ResponseMessage(MESSAGES.PRODUCT.DELETED)
  async remove(@Param('id') id: string): Promise<void> {
    await this.productService.remove(id);
  }
}
