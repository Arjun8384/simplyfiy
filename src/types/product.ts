export interface Product {
  _id?: string;
  productId: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number;
  featured: boolean;
  bestseller: boolean;
  images: string;
  description: string;
  stock?: number;
}

export type SeedProduct = Product;