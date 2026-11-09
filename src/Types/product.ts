interface BaseProduct {
  id: number;
  name: string; // trans
  description: string; // trans
  category: string;
  price: number;
  originalPrice: number;
  metaDescription: string;
  metaTitle: string;
  slug: string;
}
interface Variant {
  id: number;
  productId: number;
  colorName: string;
  hexCode: string;
  sizeName: string;
  quantity: number;
  reserved: number;
}
export interface Product extends BaseProduct {
  variants: ProductVariants[];
}
export interface ProductDetails extends BaseProduct {
  variants: ProductDetailsVariant[];
}
export interface ProductVariants extends Variant {
  imagesDtos: VariantImages;
}
export interface ProductDetailsVariant extends Variant {
  imagesDtos: VariantImages[];
}
export interface VariantImages {
  altText: string;
  imageUrl: string;
}
export interface CartItem {
  productId: number;
  variantId: number;
  name: string;
  description: string;
  price: number;
  imagesDtos: VariantImages;
  color: string;
  hexCode: string;
  size: string;
  reserved: number;
  quantity: number;
}
export interface CategoryLookup {
  id: number;
  name: string;
}
export type ProductContextType = {
  products: Product[];
  categories: CategoryLookup[];
  selectedProduct: ProductDetails | null;
  loading: boolean;
  categoriesLoading: boolean;

  GetAllProducts: (
    pageNumber: number,
    pageSize: number,
    category?: string,
    size?: string,
    color?: string,
  ) => Promise<Product[]>;
  GetById: (id: number) => Promise<ProductDetails | null>;
  GetAllCategories: () => Promise<CategoryLookup[]>;
};
