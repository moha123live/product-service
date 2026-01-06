import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller()
export class ProductController {
  @Get()
  getProducts(): string {
    return 'List of products';
  }

  @Post()
  createProduct(@Body() body): string {
    return 'Product created - ' + JSON.stringify(body);
  }
}
