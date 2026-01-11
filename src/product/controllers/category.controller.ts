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
  ParseUUIDPipe,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';

@Controller('products/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body('name') name: string) {
    return this.categoryService.create(name);
  }

  @Get('/allCategories')
  findAll(@Query('all') all: string) {
    const activeOnly = all !== 'true';
    return this.categoryService.findAll(activeOnly);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('name') name?: string,
    @Body('is_active') is_active?: boolean,
  ) {
    return this.categoryService.update(id, name, is_active);
  }

  @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
