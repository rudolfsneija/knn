import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Wifi, CheckCircle, AlertCircle, Send, Home } from 'lucide-react';

interface QuizState {
  step: number;
  answers: Record<string, string | string[] | boolean>;
}

type QuestionType = 'select' | 'input' | 'multiSelect' | 'grid' | 'result';

interface QuestionOption {
  value: string;
  label: string;
}

interface Question {
  id: string;
  type: QuestionType;
  title: string;
  question: string;
  options?: QuestionOption[];
  gridCols?: string;
  inputType?: string;
  inputProps?: Record<string, string | number>;
  validation?: (value: string | string[] | boolean) => boolean;
  showCondition?: (answers: Record<string, string | string[] | boolean>) => boolean;
  conditionalContent?: (answers: Record<string, string | string[] | boolean>) => React.ReactElement | null;
}

const questions: Question[] = [
  {
    id: 'purchaseType',
    type: 'select',
    title: 'Iegādes veids',
    question: 'Vai Jūs vēlaties iegādāties vai īrēt Wi-Fi sistēmas risinājumu?',
    options: [
      { value: 'buy', label: 'Iegādāties' },
      { value: 'rent', label: 'Īrēt' }
    ],
    validation: (value) => !!value
  },
  {
    id: 'projectType',
    type: 'select',
    title: 'Projekta veids',
    question: 'Kādas ir Jūsu vēlmes?',
    options: [
      { value: 'new_building', label: 'Jauna ēka bez Wi-Fi' },
      { value: 'upgrade', label: 'Nomainīt vai uzlabot esošo Wi-Fi' }
    ],
    validation: (value) => !!value
  },
  {
    id: 'knowsDimensions',
    type: 'select',
    title: 'Ēkas izmēri',
    question: 'Vai Jums ir zināmi Jūsu ēkas izmēri?',
    options: [
      { value: 'yes', label: 'Jā' },
      { value: 'no', label: 'Nē' }
    ],
    validation: (value) => !!value,
    showCondition: (answers) => answers.projectType !== 'new_building'
  },
  {
    id: 'hasPlans',
    type: 'select',
    title: 'Plānojums un dokumentācija',
    question: 'Vai Jums ir ēkas plānojums?',
    options: [
      { value: 'yes', label: 'Jā' },
      { value: 'no', label: 'Nē' }
    ],
    validation: (value) => !!value,
    conditionalContent: (answers) => {
      const questionText = answers.projectType === 'new_building' 
        ? 'Vai Jums ir ēkas plānojums?'
        : 'Vai Jums ir ēkas plānojums un eksistējošā tīkla dokumentācija?';
      
      return (
        <>
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            {questionText}
          </h3>
          {answers.hasPlans === 'no' && (
            <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-blue-600 mt-0.5 mr-4 flex-shrink-0" />
                <p className="text-blue-800">
                  Piedāvājam mūsu pakalpojumus tīkla audita veikšanā un dokumentēšanā.
                </p>
              </div>
            </div>
          )}
        </>
      );
    }
  },
  {
    id: 'roomCount',
    type: 'input',
    title: 'Telpu skaits',
    question: 'Cik telpas ir Jūsu ēkā?',
    inputType: 'number',
    inputProps: {
      min: 1,
      placeholder: 'Ievadiet telpu skaitu'
    },
    validation: (value) => typeof value === 'string' && value.trim() !== ''
  },
  {
    id: 'totalArea',
    type: 'input',
    title: 'Platība',
    question: 'Cik liela ir Jūsu ēkas platība? (m²)',
    inputType: 'number',
    inputProps: {
      min: 1,
      placeholder: 'Ievadiet platību kvadrātmetros'
    },
    validation: (value) => typeof value === 'string' && value.trim() !== ''
  },
  {
    id: 'ceilingHeight',
    type: 'input',
    title: 'Griesti',
    question: 'Cik (maksimāli) augsti Jūsu ēkas griesti? (m)',
    inputType: 'number',
    inputProps: {
      min: 2,
      step: 0.1,
      placeholder: 'Ievadiet griesti augstumu metros'
    },
    validation: (value) => typeof value === 'string' && value.trim() !== ''
  },
  {
    id: 'devicesPerRoom',
    type: 'grid',
    title: 'Ierīces telpā',
    question: 'Cik maksimāli daudz ierīces var būt pieslēgtas vienā telpā?',
    gridCols: 'grid-cols-2 md:grid-cols-3',
    options: [
      { value: 'up_to_10', label: 'Līdz 10' },
      { value: 'up_to_25', label: 'Līdz 25' },
      { value: 'up_to_50', label: 'Līdz 50' },
      { value: 'up_to_80', label: 'Līdz 80' },
      { value: 'up_to_120', label: 'Līdz 120' },
      { value: 'up_to_200', label: 'Līdz 200' },
      { value: 'up_to_300', label: 'Līdz 300' },
      { value: 'up_to_450', label: 'Līdz 450' },
      { value: 'up_to_600', label: 'Līdz 600' }
    ],
    validation: (value) => !!value
  },
  {
    id: 'totalDevices',
    type: 'grid',
    title: 'Kopējās ierīces',
    question: 'Cik maksimāli daudz ierīces var būt pieslēgtas Jūsu iestādē?',
    gridCols: 'grid-cols-2 md:grid-cols-4',
    options: [
      { value: 'up_to_200', label: 'Līdz 200' },
      { value: 'up_to_500', label: 'Līdz 500' },
      { value: 'up_to_1000', label: 'Līdz 1000' },
      { value: 'up_to_2000', label: 'Līdz 2000' },
      { value: 'up_to_3000', label: 'Līdz 3000' },
      { value: 'up_to_5000', label: 'Līdz 5000' },
      { value: 'up_to_8000', label: 'Līdz 8000' },
      { value: 'up_to_10000', label: 'Līdz 10000' }
    ],
    validation: (value) => !!value
  },
  {
    id: 'purposes',
    type: 'multiSelect',
    title: 'Pielietojums',
    question: 'Kādam mērķim nepieciešams Wi-Fi? (Var izvēlēties vairākas opcijas)',
    options: [
      { value: 'daily_work', label: 'Ikdienas darbs ar internetu' },
      { value: 'photo_video', label: 'Foto/video pārsūtīšana' },
      { value: 'streaming', label: 'Tiešsaistes saturs' },
      { value: 'sensors_building', label: 'Sensori un/vai ēkas vadības sistēmas' },
      { value: 'internal_systems', label: 'Pastāvīgi pieslēgts pie iekšējām sistēmām (datubāzes, monitorings)' },
      { value: 'email_music', label: 'E-pastu un mūzika' },
      { value: 'messaging', label: 'Sarakstīšanās tiešsaistēs' },
      { value: 'outdoor', label: 'Ārtelpā nodrošināt tīklu' }
    ],
    validation: (value) => Array.isArray(value) && value.length > 0
  },
  {
    id: 'result',
    type: 'result',
    title: 'Rezultāts',
    question: '',
    validation: () => true
  }
];

export function BezvaduTiklaKonfigurators() {
  const navigate = useNavigate();
  const [quizState, setQuizState] = useState<QuizState>({
    step: 1,
    answers: {}
  });

  // Filter questions based on conditions
  const getVisibleQuestions = () => {
    return questions.filter(question => {
      if (question.showCondition) {
        return question.showCondition(quizState.answers);
      }
      return true;
    });
  };

  const visibleQuestions = getVisibleQuestions();
  const currentQuestionIndex = quizState.step - 1;
  const currentQuestion = visibleQuestions[currentQuestionIndex];
  const totalSteps = visibleQuestions.length;

  const updateAnswer = (key: string, value: string | string[] | boolean) => {
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [key]: value
      }
    }));
  };

  const prevStep = () => {
    if (quizState.step > 1) {
      setQuizState(prev => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const nextStep = () => {
    if (quizState.step < totalSteps) {
      setQuizState(prev => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const handleComplete = () => {
    console.log('Quiz completed with results:', quizState.answers);
    alert('Paldies! Mūsu speciālisti sazināsies ar jums tuvākajā laikā.');
    navigate('/preces');
  };

  const canProceed = () => {
    if (!currentQuestion?.validation) return true;
    const value = quizState.answers[currentQuestion.id];
    return currentQuestion.validation(value);
  };

  const renderSelectQuestion = (question: Question) => {
    const currentValue = quizState.answers[question.id];
    
    return (
      <div className="space-y-4">
        {question.conditionalContent ? (
          question.conditionalContent(quizState.answers)
        ) : (
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            {question.question}
          </h3>
        )}
        <div className="space-y-4">
          {question.options?.map((option) => (
            <button
              key={option.value}
              onClick={() => updateAnswer(question.id, option.value)}
              className={`w-full p-6 text-left rounded-lg border-2 transition-colors ${
                currentValue === option.value
                  ? 'border-primary-600 bg-primary-50 text-primary-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <CheckCircle className={`w-6 h-6 mr-4 ${
                  currentValue === option.value ? 'text-primary-600' : 'text-gray-400'
                }`} />
                <span className="text-lg font-medium">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderInputQuestion = (question: Question) => {
    const currentValue = quizState.answers[question.id] as string || '';
    
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          {question.question}
        </h3>
        <input
          type={question.inputType || 'text'}
          value={currentValue}
          onChange={(e) => updateAnswer(question.id, e.target.value)}
          className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          {...question.inputProps}
        />
      </div>
    );
  };

  const renderGridQuestion = (question: Question) => {
    const currentValue = quizState.answers[question.id];
    
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          {question.question}
        </h3>
        <div className={`grid ${question.gridCols || 'grid-cols-2'} gap-4`}>
          {question.options?.map((option) => (
            <button
              key={option.value}
              onClick={() => updateAnswer(question.id, option.value)}
              className={`p-4 text-center rounded-lg border-2 transition-colors ${
                currentValue === option.value
                  ? 'border-primary-600 bg-primary-50 text-primary-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderMultiSelectQuestion = (question: Question) => {
    const currentValue = (quizState.answers[question.id] as string[]) || [];
    
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          {question.question}
        </h3>
        <div className="space-y-3">
          {question.options?.map((option) => {
            const isSelected = currentValue.includes(option.value);
            return (
              <button
                key={option.value}
                onClick={() => {
                  const newValue = isSelected
                    ? currentValue.filter((p: string) => p !== option.value)
                    : [...currentValue, option.value];
                  updateAnswer(question.id, newValue);
                }}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  isSelected
                    ? 'border-primary-600 bg-primary-50 text-primary-900'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <CheckCircle className={`w-5 h-5 mr-3 ${
                    isSelected ? 'text-primary-600' : 'text-gray-400'
                  }`} />
                  <span className="font-medium">{option.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderResultQuestion = () => {
    const { answers } = quizState;
    
    return (
      <div className="space-y-8">
        <div className="text-center">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">
            Paldies par atbildēm!
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Mūsu speciālisti analizēs jūsu vajadzības un sazināsies ar jums ar personalizētu risinājumu.
          </p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-4 text-lg">Jūsu izvēlētās opcijas:</h4>
          <div className="space-y-3 text-gray-700">
            {answers.purchaseType && (
              <p><strong>Iegādes veids:</strong> {answers.purchaseType === 'buy' ? 'Iegādāties' : 'Īrēt'}</p>
            )}
            {answers.projectType && (
              <p><strong>Projekta veids:</strong> {
                answers.projectType === 'new_building' ? 'Jauna ēka bez Wi-Fi' : 'Nomainīt vai uzlabot esošo Wi-Fi'
              }</p>
            )}
            {answers.roomCount && <p><strong>Telpu skaits:</strong> {answers.roomCount}</p>}
            {answers.totalArea && <p><strong>Platība:</strong> {answers.totalArea} m²</p>}
            {answers.ceilingHeight && <p><strong>Griesti augstums:</strong> {answers.ceilingHeight} m</p>}
            {answers.devicesPerRoom && (
              <p><strong>Ierīces telpā:</strong> {
                (answers.devicesPerRoom as string).replace('up_to_', 'Līdz ').replace('_', ' ')
              }</p>
            )}
            {answers.totalDevices && (
              <p><strong>Kopējās ierīces:</strong> {
                (answers.totalDevices as string).replace('up_to_', 'Līdz ').replace('_', ' ')
              }</p>
            )}
            {answers.purposes && Array.isArray(answers.purposes) && answers.purposes.length > 0 && (
              <p><strong>Pielietojums:</strong> {
                (answers.purposes as string[]).map(purpose => {
                  const option = questions.find(q => q.id === 'purposes')?.options?.find(opt => opt.value === purpose);
                  return option?.label;
                }).filter(Boolean).join(', ')
              }</p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleComplete}
            className="flex-1 bg-primary-800 hover:bg-primary-900 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center text-lg"
          >
            <Send className="w-6 h-6 mr-3" />
            Nosūtīt pieprasījumu
          </button>
          <button
            onClick={() => navigate('/preces')}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center text-lg"
          >
            <Home className="w-6 h-6 mr-3" />
            Atgriezties pie precēm
          </button>
        </div>
      </div>
    );
  };

  const renderCurrentQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'select':
        return renderSelectQuestion(currentQuestion);
      case 'input':
        return renderInputQuestion(currentQuestion);
      case 'grid':
        return renderGridQuestion(currentQuestion);
      case 'multiSelect':
        return renderMultiSelectQuestion(currentQuestion);
      case 'result':
        return renderResultQuestion();
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Wifi className="w-12 h-12 text-primary-800 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">
              Bezvadu tīkla konfigurators
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Atbildiet uz jautājumiem, lai mēs varētu piedāvāt jums vispiemērotāko Ruckus bezvadu tīkla risinājumu.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">
              Solis {quizState.step} no {totalSteps}: {currentQuestion?.title || ''}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((quizState.step - 1) / (totalSteps - 1)) * 100)}% pabeigts
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-3">
            <div 
              className="bg-primary-800 rounded-full h-3 transition-all duration-300"
              style={{ width: `${((quizState.step - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Question content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          {renderCurrentQuestion()}
        </div>

        {/* Navigation */}
        {currentQuestion?.type !== 'result' && (
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={quizState.step === 1}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Atpakaļ
            </button>
            
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center px-8 py-3 bg-primary-800 text-white rounded-lg hover:bg-primary-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Tālāk
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
