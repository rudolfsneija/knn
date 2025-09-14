interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  // Calculate progress so it only reaches 100% when all questions are completed
  // On the last question, it should show ~90-95%, not 100%
  const progressPercentage = Math.round((currentStep / totalSteps) * 90);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          {progressPercentage}% pabeigts
        </span>
        <span className="text-sm font-medium text-gray-500">
          {currentStep} / {totalSteps}
        </span>
      </div>
      <div className="bg-gray-200 rounded-full h-3">
        <div
          className="bg-primary-600 rounded-full h-3 transition-all duration-300"
          style={{
            width: `${progressPercentage}%`,
          }}
        />
      </div>
    </div>
  );
}
