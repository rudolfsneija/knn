// Core types for Alnet configurator
export type AnswerValue = string | number | boolean | string[];

export interface Answers {
  [questionId: string]: AnswerValue;
}

// Question types
export interface QuestionOption {
  id: string;
  label: string;
  value: string;
  description?: string;
  tooltip?: string;
}

export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  message?: string;
}

export interface DualNumberField {
  id: string;
  label: string;
  placeholder?: string;
  validation?: ValidationRule;
}

export interface Question {
  id: string;
  title: string;
  description?: string;
  type: 'multiselect' | 'number' | 'yesno' | 'dual-number';
  options?: QuestionOption[];
  fields?: DualNumberField[]; // For dual-number type
  validation?: ValidationRule;
  dependencies?: string[]; // IDs of questions this depends on
  showCondition?: (answers: Answers) => boolean;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  currency: string;
  category: 'license' | 'camera' | 'server' | 'addon';
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

// Recommendation types
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