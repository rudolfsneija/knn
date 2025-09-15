// ALNET-specific types extending shared types
import type {
  Product as BaseProduct,
  Answers,
  Question,
  QuestionOption,
  ValidationRule,
  DualNumberField,
} from '../types';

// Re-export shared types for backward compatibility
export type { Answers, Question, QuestionOption, ValidationRule, DualNumberField };

// ALNET-specific product categories
export type AlnetProductCategory = 'license' | 'camera' | 'server' | 'addon';

// Product types
export interface Product extends BaseProduct {
  category: AlnetProductCategory;
  specifications?: Record<string, string | number>;
  requirements?: string[];
  maxChannels?: number;
  minChannels?: number;
}

export interface LicenseProduct extends Product {
  category: 'license';
  licenseType: 'base' | 'addon' | 'per_unit';
  channelsIncluded?: number;
  maxIOLines?: number;
}

export interface CameraProduct extends Product {
  category: 'camera';
  cameraType: 'fixed_outdoor' | 'fixed_indoor' | 'ptz_outdoor' | 'panorama';
  maxDistance?: number;
  resolution?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface ServerProduct extends Product {
  category: 'server';
  maxChannels: number;
  storageOptions?: number[];
  cpuSpecs?: string;
  ramOptions?: number[];
}

// ALNET-specific recommendation types
export interface RecommendationItem {
  product: Product;
  quantity: number;
  totalPrice: number;
  reason: string;
}

export interface ConfigurationResult {
  baseLicense: RecommendationItem;
  addons: RecommendationItem[];
  cameras: RecommendationItem[];
  servers: RecommendationItem[];
  totalPrice: number;
  notes: string[];
}

// Rules engine types
export interface BusinessRule {
  id: string;
  name: string;
  condition: (answers: Answers) => boolean;
  action: (answers: Answers) => RecommendationItem[];
  priority: number;
}
