export const PRODUCT_MESSAGES = {
  // Product Messages
  PRODUCT: {
    CREATED: 'Product created successfully',
    UPDATED: 'Product updated successfully',
    DELETED: 'Product deleted successfully',
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
    PRICE_INVALID: 'Price must be a positive number',
    STOCK_INVALID: 'Stock quantity must be a non-negative integer',
    UNIT_TYPE_INVALID:
      'Unit type must be one of: kg, g, l, ml, packs, pcs, units',
    VARIANT_REQUIRED: 'At least one variant is required',
    CATEGORY_REQUIRED: 'At least one category is required',
    IMAGE_URL_REQUIRED: 'Image URL is required',
  },
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Unit Types
export const UNIT_TYPES = {
  KG: 'kg',
  G: 'g',
  L: 'l',
  ML: 'ml',
  PACKS: 'packs',
  PCS: 'pcs',
  UNITS: 'units',
} as const;

export type UnitType = (typeof UNIT_TYPES)[keyof typeof UNIT_TYPES];
