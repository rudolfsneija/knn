import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type {
  Answers,
  Question,
  RecommendationItem,
  ConfiguratorConfig,
} from '../configurators/types';

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

export function useConfigurator(config: ConfiguratorConfig) {
  const navigate = useNavigate();
  const [state, setState] = useState<ConfiguratorState>({
    step: 1,
    answers: {},
    currentQuestionId: config.questions[0].id,
  });
  const [isSubmittingResults, setIsSubmittingResults] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
  });

  // Get visible questions based on current answers
  const getVisibleQuestions = (): Question[] => {
    return config.questions.filter((question) =>
      config.shouldShowQuestion(question, state.answers)
    );
  };

  const visibleQuestions = getVisibleQuestions();
  const currentQuestion = visibleQuestions.find((q) => q.id === state.currentQuestionId);
  const currentQuestionIndex = visibleQuestions.findIndex((q) => q.id === state.currentQuestionId);
  const totalSteps = visibleQuestions.length;

  const updateAnswer = (questionId: string, value: string | number | boolean | string[]) => {
    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: value,
      },
    }));
  };

  const prevStep = () => {
    if (currentQuestionIndex > 0) {
      const prevQuestion = visibleQuestions[currentQuestionIndex - 1];
      setState((prev) => ({
        ...prev,
        step: prev.step - 1,
        currentQuestionId: prevQuestion.id,
      }));
    }
  };

  const nextStep = () => {
    if (currentQuestionIndex < visibleQuestions.length - 1) {
      const nextQuestion = visibleQuestions[currentQuestionIndex + 1];
      setState((prev) => ({
        ...prev,
        step: prev.step + 1,
        currentQuestionId: nextQuestion.id,
      }));
    } else {
      // Generate final recommendations
      generateResults();
    }
  };

  const generateResults = () => {
    const result = config.calculateRecommendations(state.answers);
    setState((prev) => ({
      ...prev,
      result,
      step: totalSteps + 1,
    }));
  };

  const handleComplete = async () => {
    if (!showContactForm) {
      setShowContactForm(true);
      return;
    }

    setIsSubmittingResults(true);
    setSubmitMessage('');

    try {
      const totalPrice = state.result?.reduce((sum, item) => sum + item.totalPrice, 0) || 0;

      const response = await fetch(config.apiEndpoint || '/api/configurator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAnswers: state.answers,
          recommendations: state.result,
          totalPrice: totalPrice,
          userEmail: contactInfo.email || null,
          userName: contactInfo.name || null,
          userPhone: contactInfo.phone || null,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage(data.message);
        // Hide contact form after successful submission
        setShowContactForm(false);
      } else {
        setSubmitMessage(`Kļūda: ${data.error}`);
      }
    } catch (error) {
      console.error('Error submitting configurator results:', error);
      setSubmitMessage(
        'Neizdevās nosūtīt konfigurācijas rezultātus. Lūdzu, mēģiniet vēlāk vai sazinieties ar mums tieši pa e-pastu info@knn.lv'
      );
    } finally {
      setIsSubmittingResults(false);
    }
  };

  const canProceed = (): boolean => {
    if (!currentQuestion) return true;

    // Handle other question types
    if (!currentQuestion.validation) return true;
    const value = state.answers[currentQuestion.id];

    // For required validation, check if value is explicitly undefined or null
    // Don't treat false as invalid for boolean questions
    if (currentQuestion.validation.required) {
      if (value === undefined || value === null) {
        return false;
      }
      // For string values, also check for empty string
      if (typeof value === 'string' && value === '') {
        return false;
      }
    }

    if (
      currentQuestion.validation.min !== undefined &&
      typeof value === 'number' &&
      value < currentQuestion.validation.min
    ) {
      return false;
    }
    return true;
  };

  const updateContactInfo = (field: keyof ContactInfo, value: string) => {
    setContactInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    // State
    state,
    currentQuestion,
    currentQuestionIndex,
    totalSteps,
    visibleQuestions,
    isSubmittingResults,
    submitMessage,
    showContactForm,
    contactInfo,

    // Actions
    updateAnswer,
    prevStep,
    nextStep,
    handleComplete,
    canProceed,
    updateContactInfo,
    setShowContactForm,
    navigate,

    // Configuration
    resultsProcessor: config.resultsProcessor,
    notes: config.notes,
  };
}
