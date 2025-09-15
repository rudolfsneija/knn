import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  MultiSelectQuestion,
  NumberQuestion,
  DualNumberQuestion,
  SliderQuestion,
  YesNoQuestion,
  ResultsPage,
  ProgressIndicator,
} from './index';
import type { Answers, Question, RecommendationItem } from '../../configurators/types';

interface ConfiguratorState {
  step: number;
  answers: Answers;
  currentQuestionId: string;
  result?: RecommendationItem[];
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

interface ConfiguratorHook {
  state: ConfiguratorState;
  currentQuestion?: Question;
  currentQuestionIndex: number;
  totalSteps: number;
  visibleQuestions: Question[];
  isSubmittingResults: boolean;
  submitMessage: string;
  showContactForm: boolean;
  contactInfo: ContactInfo;
  updateAnswer: (questionId: string, value: string | number | boolean | string[]) => void;
  prevStep: () => void;
  nextStep: () => void;
  handleComplete: () => Promise<void>;
  canProceed: () => boolean;
  updateContactInfo: (field: keyof ContactInfo, value: string) => void;
  setShowContactForm: (show: boolean) => void;
  navigate: (path: string) => void;
  resultsProcessor?: (result: RecommendationItem[]) => React.ReactNode;
  notes?: string[];
}

interface ConfiguratorProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  configuratorHook: ConfiguratorHook;
}

export function Configurator({ title, subtitle, icon, configuratorHook }: ConfiguratorProps) {
  const {
    state,
    currentQuestion,
    currentQuestionIndex,
    totalSteps,
    visibleQuestions,
    isSubmittingResults,
    submitMessage,
    showContactForm,
    contactInfo,
    updateAnswer,
    prevStep,
    nextStep,
    handleComplete,
    canProceed,
    updateContactInfo,
    setShowContactForm,
    navigate,
    resultsProcessor,
    notes,
  } = configuratorHook;

  // Check if we're on results page
  if (state.step > totalSteps) {
    if (state.result) {
      return (
        <div className="min-h-screen bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-secondary-50 rounded-2xl shadow-xl p-8">
                <ResultsPage
                  result={state.result}
                  isSubmittingResults={isSubmittingResults}
                  submitMessage={submitMessage}
                  showContactForm={showContactForm}
                  contactInfo={contactInfo}
                  handleComplete={handleComplete}
                  updateContactInfo={updateContactInfo}
                  setShowContactForm={setShowContactForm}
                  navigate={navigate}
                  resultsProcessor={resultsProcessor}
                  notes={notes}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'multiselect':
        return (
          <MultiSelectQuestion
            question={currentQuestion}
            currentValue={(state.answers[currentQuestion.id] as string[]) || []}
            updateAnswer={updateAnswer}
          />
        );
      case 'number':
        return (
          <NumberQuestion
            question={currentQuestion}
            currentValue={(state.answers[currentQuestion.id] as number) || ''}
            updateAnswer={updateAnswer}
            canProceed={canProceed}
          />
        );
      case 'dual-number':
        return (
          <DualNumberQuestion
            question={currentQuestion}
            answers={state.answers}
            updateAnswer={updateAnswer}
          />
        );
      case 'slider':
        return (
          <SliderQuestion
            question={currentQuestion}
            currentValue={state.answers[currentQuestion.id] as number | undefined}
            updateAnswer={updateAnswer}
          />
        );
      case 'yesno':
        return (
          <YesNoQuestion
            question={currentQuestion}
            currentValue={state.answers[currentQuestion.id] as boolean | undefined}
            updateAnswer={updateAnswer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              {icon}
              <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
            </div>
            <p className="text-xl text-gray-600">{subtitle}</p>
          </div>

          {/* Progress bar */}
          <ProgressIndicator currentStep={state.step} totalSteps={totalSteps} />

          {/* Question content */}
          <div className="bg-secondary-50 rounded-2xl shadow-xl p-8 mb-8">{renderQuestion()}</div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentQuestionIndex === 0}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Iepriekšējais
            </button>

            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {currentQuestionIndex === visibleQuestions.length - 1 ? 'Pabeigt' : 'Nākamais'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
