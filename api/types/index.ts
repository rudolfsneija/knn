export interface User {
  id: number;
  username: string;
  email: string;
  password_hash?: string; // Optional for responses
  first_name?: string;
  last_name?: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginRequest {
  username: string; // Can be username or email
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: Omit<User, 'password_hash'>;
    token: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

// Aktualitātes (News/Updates) interfaces
export interface Aktualitate {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  published: boolean;
  admin_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateAktualitateRequest {
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  published?: boolean;
}

export interface UpdateAktualitateRequest {
  title?: string;
  content?: string;
  excerpt?: string;
  image_url?: string;
  published?: boolean;
}

// Produkti (Products) interfaces
export interface Produkts {
  id: number;
  name: string;
  description?: string;
  price?: number;
  category?: string;
  image_url?: string;
  gallery_urls?: string[]; // Will be stored as JSON in DB
  specifications?: Record<string, any>; // Will be stored as JSON in DB
  available: boolean;
  featured: boolean;
  admin_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProduktsRequest {
  name: string;
  description?: string;
  price?: number;
  category?: string;
  image_url?: string;
  gallery_urls?: string[];
  specifications?: Record<string, any>;
  available?: boolean;
  featured?: boolean;
}

export interface UpdateProduktsRequest {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  image_url?: string;
  gallery_urls?: string[];
  specifications?: Record<string, any>;
  available?: boolean;
  featured?: boolean;
}
