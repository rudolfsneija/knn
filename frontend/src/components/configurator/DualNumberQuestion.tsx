import type { Question, Answers } from '../../configurators/types';

interface DualNumberQuestionProps {
  question: Question;
  answers: Answers;
  updateAnswer: (questionId: string, value: number) => void;
}

export function DualNumberQuestion({ question, answers, updateAnswer }: DualNumberQuestionProps) {
  const functions = (answers.system_functions as string[]) || [];
  const showAnalytics = functions.includes('video_analytics');

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">{question.title}</h3>
      {question.description && (
        <p className="text-gray-600 mb-6">
          {showAnalytics
            ? `${question.description} un kameras ar videoanalītikas funkcionalitāti`
            : question.description}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {question.fields?.map((field) => {
          const currentValue = (answers[field.id] as number) || '';
          const isAnalyticsField = field.id.includes('analytics');

          // Only show analytics field if video analytics is selected
          if (isAnalyticsField && !showAnalytics) {
            return null;
          }

          return (
            <div key={field.id} className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">{field.label}</label>
              <input
                type="number"
                value={currentValue}
                onChange={(e) => updateAnswer(field.id, parseInt(e.target.value) || 0)}
                className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder={field.placeholder || '0'}
                min={0}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
