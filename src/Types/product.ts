export interface Product {
  id: number;
  name: string; // trans
  description: string; // trans
  category: string;
  price: number;
  originalPrice: number;
  metaDescription: string;
  metaTitle: string;
  slug: string;
  variants: Variant[];
}

export interface Variant {
  id: number;
  productId: number;
  imagesDtos: VariantImages[];
  colorName: string;
  hexCode: string;
  sizeName: string;
  quantity: number;
  reserved: number;
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
