import { CheckCircle } from 'lucide-react';
import type { Question } from '../../configurators/alnet/types';

interface YesNoQuestionProps {
  question: Question;
  currentValue: boolean | undefined;
  updateAnswer: (questionId: string, value: boolean) => void;
}

export function YesNoQuestion({ question, currentValue, updateAnswer }: YesNoQuestionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">{question.title}</h3>
      {question.description && <p className="text-gray-600 mb-6">{question.description}</p>}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => updateAnswer(question.id, true)}
          className={`p-6 text-center rounded-lg border-2 transition-colors ${
            currentValue === true
              ? 'border-primary-600 bg-primary-50 text-primary-900'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <CheckCircle
            className={`w-8 h-8 mx-auto mb-2 ${
              currentValue === true ? 'text-primary-600' : 'text-gray-400'
            }`}
          />
          <span className="font-medium text-lg">Jā</span>
        </button>
        <button
          onClick={() => updateAnswer(question.id, false)}
          className={`p-6 text-center rounded-lg border-2 transition-colors ${
            currentValue === false
              ? 'border-primary-600 bg-primary-50 text-primary-900'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <CheckCircle
            className={`w-8 h-8 mx-auto mb-2 ${
              currentValue === false ? 'text-primary-600' : 'text-gray-400'
            }`}
          />
          <span className="font-medium text-lg">Nē</span>
        </button>
      </div>
    </div>
  );
}
