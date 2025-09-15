// Ruckus-specific types extending shared types
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

// Ruckus-specific product categories
export type RuckusProductCategory = 'access-point';

// Product types
export interface Product extends BaseProduct {
  category: RuckusProductCategory;
}

// Ruckus-specific product types
export interface AccessPointProduct extends Product {
  category: 'access-point';
  wifiStandard?: string;
  maxUsers?: number;
  coverage?: string;
  antennaType?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

// Ruckus-specific recommendation types
export interface RecommendationItem {
  product: Product;
  quantity: number;
  totalPrice: number;
  reason: string;
}

export interface ConfigurationResult {
  accessPoints: RecommendationItem[];
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
