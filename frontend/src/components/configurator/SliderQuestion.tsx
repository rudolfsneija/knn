import { useState, useEffect } from 'react';
import type { Question } from '../../configurators/types';

interface SliderQuestionProps {
  question: Question;
  currentValue: number | undefined;
  updateAnswer: (questionId: string, value: number) => void;
}

export function SliderQuestion({ question, currentValue, updateAnswer }: SliderQuestionProps) {
  const min = question.min ?? 0;
  const max = question.max ?? 100;
  const step = question.step ?? 1;
  const unit = question.unit ?? '';

  // Use local state for smooth slider updates
  const [localValue, setLocalValue] = useState<number>(currentValue ?? min);
  const [inputValue, setInputValue] = useState<string>((currentValue ?? min).toString());

  // Update local value when currentValue changes or question changes
  useEffect(() => {
    const defaultValue = currentValue ?? min;
    setLocalValue(defaultValue);
    setInputValue(defaultValue.toString());
  }, [currentValue, min, question.id]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setLocalValue(newValue);
    setInputValue(newValue.toString());
    updateAnswer(question.id, newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    setInputValue(rawValue);

    // Allow empty input for clearing
    if (rawValue === '') {
      return; // Don't update the actual value yet, just allow empty input
    }

    const newValue = parseFloat(rawValue);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      setLocalValue(newValue);
      updateAnswer(question.id, newValue);
    }
  };

  const handleInputBlur = () => {
    // On blur, if input is empty or invalid, reset to current valid value
    if (inputValue === '' || isNaN(parseFloat(inputValue))) {
      setInputValue(localValue.toString());
    }
  };

  // Generate tick marks for better visual guidance
  const generateTicks = () => {
    // Use custom tick marks if provided
    if (question.tickMarks && question.tickMarks.length > 0) {
      return question.tickMarks.filter((tick) => tick >= min && tick <= max).sort((a, b) => a - b);
    }

    // Otherwise, generate automatic tick marks
    const tickCount = 5;
    const range = max - min;
    const tickStep = range / (tickCount - 1);

    return Array.from({ length: tickCount }, (_, i) => {
      const value = min + i * tickStep;
      return Math.round(value);
    });
  };

  const ticks = generateTicks();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">{question.title}</h3>
        {question.description && <p className="text-gray-600 mb-6">{question.description}</p>}
      </div>

      <div className="space-y-8">
        {/* Current value display */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center min-w-32 min-h-16 w-auto h-16 bg-secondary-100 rounded-full px-4">
            <span className="text-xl font-bold text-secondary-800 text-center">
              {localValue.toLocaleString()}
              {unit && <span className="text-lg ml-1">{unit}</span>}
            </span>
          </div>
        </div>

        {/* Slider */}
        <div className="w-full max-w-3xl mx-auto">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={localValue}
            onChange={handleSliderChange}
            className="w-full custom-slider focus:outline-none focus:ring-2 focus:ring-primary-600"
            style={
              {
                '--slider-progress': `${((localValue - min) / (max - min)) * 100}%`,
              } as React.CSSProperties
            }
          />

          {/* Tick marks - using flexbox with negative margin to match slider positioning */}
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {ticks.map((tick, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-0.5 h-2 bg-gray-400 mb-1"></div>
                <span className="whitespace-nowrap">
                  {tick}
                  {unit && <span className="ml-0.5">{unit}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Manual input */}
        <div className="flex items-center justify-center space-x-4">
          {/* <label htmlFor={`${question.id}-input`} className="text-sm font-medium text-gray-700">
            Vērtība:
          </label> */}
          <div className="flex items-center space-x-2 mt-4">
            <input
              id={`${question.id}-input`}
              type="number"
              min={min}
              max={max}
              step={step}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="w-25 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-center"
            />
            {unit && <span className="text-sm text-gray-500 font-medium">{unit}</span>}
          </div>
        </div>

        {/* Range display */}
        {/* <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
          <span>
            Min: {min}
            {unit}
          </span>
          <span>
            Max: {max}
            {unit}
          </span>
        </div> */}
      </div>
    </div>
  );
}
