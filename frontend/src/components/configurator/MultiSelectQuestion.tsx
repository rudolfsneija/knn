import { CheckCircle, Info } from 'lucide-react';
import type { Question } from '../../configurators/types';

interface MultiSelectQuestionProps {
  question: Question;
  currentValue: string[];
  updateAnswer: (questionId: string, value: string[]) => void;
}

export function MultiSelectQuestion({
  question,
  currentValue,
  updateAnswer,
}: MultiSelectQuestionProps) {
  const allowMultiple = question.multipleSelection !== false; // Default to true

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">{question.title}</h3>
      {question.description && <p className="text-gray-600 mb-6">{question.description}</p>}
      <div className="space-y-3">
        {question.options?.map((option) => {
          const isSelected = currentValue.includes(option.value);
          return (
            <button
              key={option.value}
              onClick={() => {
                let newValue: string[];
                if (allowMultiple) {
                  // Multiple selection mode (existing behavior)
                  newValue = isSelected
                    ? currentValue.filter((v: string) => v !== option.value)
                    : [...currentValue, option.value];
                } else {
                  // Single selection mode
                  if (isSelected && question.validation?.required) {
                    // Don't allow deselection if question is required
                    return;
                  }
                  newValue = isSelected ? [] : [option.value];
                }
                updateAnswer(question.id, newValue);
              }}
              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                isSelected
                  ? 'border-secondary-500 bg-secondary-100 text-primary-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <CheckCircle
                    className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${
                      isSelected ? 'text-secondary-600' : 'text-gray-400'
                    }`}
                  />
                  <span className="font-medium leading-relaxed">{option.label}</span>
                </div>
                {option.tooltip && (
                  <div className="relative group ml-2">
                    <Info className="w-4 h-4 text-info-600 hover:text-info-700" />
                    <div className="absolute bottom-full right-0 mb-2 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none z-10 w-80 whitespace-normal">
                      {option.tooltip}
                      <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
