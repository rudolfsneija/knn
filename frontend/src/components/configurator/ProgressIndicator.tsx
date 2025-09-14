interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const progressPercentage = totalSteps > 1 ? Math.round(((currentStep - 1) / totalSteps) * 100) : 0;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          {progressPercentage}% pabeigts
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
