import type { Question } from '../../configurators/alnet/types';

interface NumberQuestionProps {
  question: Question;
  currentValue: number | string;
  updateAnswer: (questionId: string, value: number) => void;
  canProceed: () => boolean;
}

export function NumberQuestion({
  question,
  currentValue,
  updateAnswer,
  canProceed,
}: NumberQuestionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">{question.title}</h3>
      {question.description && <p className="text-gray-600 mb-6">{question.description}</p>}
      <input
        type="number"
        value={currentValue}
        onChange={(e) => updateAnswer(question.id, parseInt(e.target.value) || 0)}
        className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        placeholder="Ievadiet skaitu"
        min={question.validation?.min || 0}
        max={question.validation?.max}
      />
      {question.validation?.message && !canProceed() && (
        <p className="text-red-600 text-sm mt-2">{question.validation.message}</p>
      )}
    </div>
  );
}
