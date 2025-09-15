// Shared types for all configurators
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
  type: 'multiselect' | 'number' | 'slider' | 'dual-number' | 'yesno';
  options?: QuestionOption[];
  fields?: DualNumberField[]; // For dual-number type
  validation?: ValidationRule;
  dependencies?: string[]; // IDs of questions this depends on
  showCondition?: (answers: Answers) => boolean;
  // Multiselect-specific properties
  multipleSelection?: boolean; // Allow multiple selections (default: true)
  // Slider-specific properties
  min?: number;
  max?: number;
  step?: number;
  unit?: string; // e.g., "m²", "devices", "users"
  tickMarks?: number[]; // Custom tick mark values to override automatic generation
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  currency: string;
  category: string; // Made generic instead of specific union
  specifications?: Record<string, string | number>;
  requirements?: string[];
  maxChannels?: number;
  minChannels?: number;
}

// Generic recommendation types
export interface RecommendationItem {
  product: Product;
  quantity: number;
  totalPrice: number;
  reason: string;
}

export interface ConfigurationResult {
  items: RecommendationItem[];
  totalPrice: number;
  notes: string[];
}

// // Rules engine types
// export interface BusinessRule {
//   id: string;
//   name: string;
//   condition: (answers: Answers) => boolean;
//   action: (answers: Answers) => RecommendationItem[];
//   priority: number;
// }

// Configurator configuration interface
export interface ConfiguratorConfig {
  questions: Question[];
  shouldShowQuestion: (question: Question, answers: Answers) => boolean;
  calculateRecommendations: (answers: Answers) => RecommendationItem[];
  apiEndpoint?: string;
  resultsProcessor?: (result: RecommendationItem[]) => React.ReactNode;
  notes?: string[];
}
