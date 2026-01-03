export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  description: string;
  discount: number;
  rating: number;
  variants: Variant[];
}

export interface Variant {
  id: number;
  gallery: string[];
  colorId: number;
  color: string;
  sizeId: number;
  size: string;
  quantity: number;
  reserved: number;
}

export interface CartItem {
  productId: number;
  variantId: number;
  name: string;
  price: number;
  description: string;
  gallery: string[];
  colorId: number;
  color: string;
  sizeId: number;
  size: string;
  reserved: number;
  quantity: number;
}