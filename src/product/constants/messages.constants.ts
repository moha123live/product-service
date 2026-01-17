export const MESSAGES = {
  // Product Messages
  PRODUCT: {
    CREATED: 'Product created successfully',
    UPDATED: 'Product updated successfully',
    DELETED: 'Product deleted successfully',
    PRODUCT_RETRIEVED: 'Product retrieved successfully',
    PRODUCTS_RETRIEVED: 'Products retrieved successfully',
    VARIANT_RETRIEVED: 'Product variants retrieved successfully',
    FEATURED_RETRIEVED: 'Featured products retrieved successfully',
    NOT_FOUND: 'Product not found',
    SLUG_EXISTS: 'Product with this slug already exists',
    VARIANT_NOT_FOUND: 'Product variant not found',
    OUT_OF_STOCK: 'Product is out of stock',
    INSUFFICIENT_STOCK: 'Insufficient stock available',
    IMAGE_NOT_FOUND: 'Product image not found',
  },

  // Category Messages
  CATEGORY: {
    CREATED: 'Category created successfully',
    UPDATED: 'Category updated successfully',
    DELETED: 'Category deleted successfully',
    NOT_FOUND: 'Category not found',
    NAME_EXISTS: 'Category with this name already exists',
    HAS_PRODUCTS: 'Cannot delete category with associated products',
  },

  // Variant Messages
  VARIANT: {
    CREATED: 'Product variant created successfully',
    UPDATED: 'Product variant updated successfully',
    DELETED: 'Product variant deleted successfully',
    NOT_FOUND: 'Product variant not found',
    SKU_EXISTS: 'Variant SKU already exists',
  },

  // Validation Messages
  VALIDATION: {
    NAME_REQUIRED: 'Product name is required',
    SLUG_REQUIRED: 'Product slug is required',
    SLUG_INVALID:
      'Slug must contain only lowercase letters, numbers, and hyphens',
    SKU_INVALID:
      'SKU must contain only uppercase letters, numbers, hyphens, and underscores',
    PRICE_INVALID: 'Price must be a positive number',
    STOCK_INVALID: 'Stock quantity must be a non-negative integer',
    UNIT_TYPE_INVALID:
      'Unit type must be one of: kg, g, l, ml, packs, pcs, units',
    VARIANT_REQUIRED: 'At least one variant is required',
    CATEGORY_REQUIRED: 'At least one category is required',
    IMAGE_URL_REQUIRED: 'Image URL is required',
    SERVER_ERROR: 'Internal server error',
    VALIDATION_FAILED: 'Validation failed',
    DUPLICATE_VALUE: 'Duplicate value violates unique constraint',
    REFERENCE_NOT_EXIST: 'Referenced resource does not exist',
    INVALID_FORMAT: 'Invalid ID format',
    DATABASE_ERROR: 'Database error occurred',
    SUCCESS: 'Success',
    CREATED: 'Created successfully',
    DELETED: 'Deleted successfully',
  },
} as const;
