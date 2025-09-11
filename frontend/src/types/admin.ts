export interface ProductImage {
  id: number;
  uuid: string;
  url: string;
  original_name: string;
  file_size: number;
  width: number;
  height: number;
  is_main: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price?: number;
  category?: string;
  sub_category?: string;
  image_url?: string;
  specifications?: Record<string, string>;
  available: boolean;
  featured: boolean;
  created_at: string;
  images?: ProductImage[];
  main_image?: ProductImage | null;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  sub_category: string;
  specifications: Record<string, string>;
  available: boolean;
  featured: boolean;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  published: boolean;
  created_at: string;
  images?: ProductImage[];
  main_image?: ProductImage | null;
}

export interface ArticleFormData {
  title: string;
  content: string;
  excerpt: string;
  created_at: string;
  published: boolean;
}
