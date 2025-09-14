import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Cctv, CheckCircle, AlertCircle, Send, Home, Camera, Server, ShieldCheck, Plus } from 'lucide-react';
import { ALNET_QUESTIONS, shouldShowQuestion } from '../configurators/alnet/questions';
import { calculateRecommendations } from '../configurators/alnet/rules';
import type { Answers, Question, RecommendationItem } from '../configurators/alnet/types';

interface ConfiguratorState {
  step: number;
  answers: Answers;
  currentQuestionId: string;
  result?: RecommendationItem[];
}

export function AlnetKonfigurators() {
  const navigate = useNavigate();
  const [state, setState] = useState<ConfiguratorState>({
    step: 1,
    answers: {},
    currentQuestionId: ALNET_QUESTIONS[0].id
  });

  // Get visible questions based on current answers
  const getVisibleQuestions = (): Question[] => {
    return ALNET_QUESTIONS.filter(question => shouldShowQuestion(question, state.answers));
  };

  const visibleQuestions = getVisibleQuestions();
  const currentQuestion = visibleQuestions.find(q => q.id === state.currentQuestionId);
  const currentQuestionIndex = visibleQuestions.findIndex(q => q.id === state.currentQuestionId);
  const totalSteps = visibleQuestions.length;

  const updateAnswer = (questionId: string, value: string | number | boolean | string[]) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: value
      }
    }));
  };

  const prevStep = () => {
    if (currentQuestionIndex > 0) {
      const prevQuestion = visibleQuestions[currentQuestionIndex - 1];
      setState(prev => ({
        ...prev,
        step: prev.step - 1,
        currentQuestionId: prevQuestion.id
      }));
    }
  };

  const nextStep = () => {
    if (currentQuestionIndex < visibleQuestions.length - 1) {
      const nextQuestion = visibleQuestions[currentQuestionIndex + 1];
      setState(prev => ({
        ...prev,
        step: prev.step + 1,
        currentQuestionId: nextQuestion.id
      }));
    } else {
      // Generate final recommendations
      generateResults();
    }
  };

  const generateResults = () => {
    const result = calculateRecommendations(state.answers);
    setState(prev => ({
      ...prev,
      result,
      step: totalSteps + 1
    }));
  };

  const handleComplete = () => {
    console.log('Konfiguratora rezulāti:', state.result);
    alert(`TODO: Nosūtīt uz epastu\nKonfiguratora rezulāti: ${JSON.stringify(state.result, null, 2)}`);
    navigate('/preces');
  };

  const canProceed = (): boolean => {
    if (!currentQuestion?.validation) return true;
    const value = state.answers[currentQuestion.id];
    if (currentQuestion.validation.required && (value === undefined || value === null || value === '')) {
      return false;
    }
    if (currentQuestion.validation.min !== undefined && typeof value === 'number' && value < currentQuestion.validation.min) {
      return false;
    }
    return true;
  };

  const renderMultiSelectQuestion = (question: Question) => {
    const currentValue = (state.answers[question.id] as string[]) || [];

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          {question.title}
        </h3>
        {question.description && (
          <p className="text-gray-600 mb-6">{question.description}</p>
        )}
        <div className="space-y-3">
          {question.options?.map((option) => {
            const isSelected = currentValue.includes(option.value);
            return (
              <button
                key={option.value}
                onClick={() => {
                  const newValue = isSelected
                    ? currentValue.filter((v: string) => v !== option.value)
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

  const renderNumberQuestion = (question: Question) => {
    const currentValue = state.answers[question.id] as number || '';

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          {question.title}
        </h3>
        {question.description && (
          <p className="text-gray-600 mb-6">{question.description}</p>
        )}
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
  };

  const renderYesNoQuestion = (question: Question) => {
    const currentValue = state.answers[question.id];

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          {question.title}
        </h3>
        {question.description && (
          <p className="text-gray-600 mb-6">{question.description}</p>
        )}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => updateAnswer(question.id, true)}
            className={`p-6 text-center rounded-lg border-2 transition-colors ${
              currentValue === true
                ? 'border-primary-600 bg-primary-50 text-primary-900'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${
              currentValue === true ? 'text-primary-600' : 'text-gray-400'
            }`} />
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
            <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${
              currentValue === false ? 'text-primary-600' : 'text-gray-400'
            }`} />
            <span className="font-medium text-lg">Nē</span>
          </button>
        </div>
      </div>
    );
  };

  const renderResultsPage = () => {
    if (!state.result) return null;

    // Process the recommendations array
    const netstationLicenses = state.result.filter(r => 
      ['netstation_4', 'netstation_enterprise_4'].includes(r.product.id)
    );
    
    // Calculate total NetStation licenses
    const totalNetstationLicenses = netstationLicenses.reduce((sum, license) => sum + license.quantity, 0);
    const primaryNetstation = netstationLicenses[0]; // Use first one as primary for display
    
    const addons = state.result.filter(r => 
      r.product.category === 'license' && 
      !['netstation_4', 'netstation_enterprise_4'].includes(r.product.id)
    );
    
    const cameras: RecommendationItem[] = []; // No camera recommendations in new system
    const servers: RecommendationItem[] = []; // No server recommendations in new system
    
    const totalPrice = state.result.reduce((sum, item) => sum + item.totalPrice, 0);
    const notes = [
      'Cenas ir orientējošas un attiecas tikai uz licencēm',
      'Kameras un serveri tiks piedāvāti pēc detalizētas specifikācijas'
    ];

    return (
      <div className="space-y-8">
        <div className="text-center">
          <Check className="w-20 h-20 text-green-600 mx-auto mb-6" />
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">
            Konfiguratora rezultāti
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Mūsu sistēma ir analizējusi jūsu vajadzības un sagatavoja personalizētu risinājumu.
          </p>
        </div>

        {/* Base License */}
        {primaryNetstation && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-4 text-lg flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2" />
              Pamata licence{totalNetstationLicenses > 1 ? 's' : ''}
            </h4>
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-900">
                    {totalNetstationLicenses > 1 ? `${totalNetstationLicenses}x ` : ''}{primaryNetstation.product.name}
                  </h5>
                  <p className="text-gray-600 text-sm">{primaryNetstation.product.description}</p>
                  <p className="text-blue-600 text-sm mt-1">
                    {totalNetstationLicenses > 1 
                      ? `${totalNetstationLicenses} licences nepieciešamas lielajam kameru skaitam`
                      : primaryNetstation.reason
                    }
                  </p>
                  {totalNetstationLicenses > 1 && (
                    <p className="text-gray-500 text-sm mt-1">
                      Katrai licencei ir 4 pamata kanāli (kopā {totalNetstationLicenses * 4} pamata kanāli)
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    €{netstationLicenses.reduce((sum, license) => sum + license.totalPrice, 0)}
                  </p>
                  {totalNetstationLicenses > 1 && (
                    <p className="text-xs text-gray-500">
                      €{primaryNetstation.product.basePrice} × {totalNetstationLicenses}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add-ons */}
        {addons.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="font-semibold text-green-900 mb-4 text-lg flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Papildu licences ({addons.length})
            </h4>
            <div className="space-y-3">
              {addons.map((addon: RecommendationItem, index: number) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-900">{addon.product.name}</h5>
                      <p className="text-gray-600 text-sm">{addon.product.description}</p>
                      <p className="text-green-600 text-sm mt-1">{addon.reason}</p>
                      {/* {addon.quantity > 1 && (
                        <p className="text-gray-500 text-sm">Daudzums: {addon.quantity}</p>
                      )} */}
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        €{addon.totalPrice}
                      </p>
                      {addon.quantity > 1 && (
                        <p className="text-xs text-gray-500">
                          €{addon.product.basePrice} × {addon.quantity}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cameras */}
        {cameras.length > 0 && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h4 className="font-semibold text-purple-900 mb-4 text-lg flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              Kameras ({cameras.length} veidi)
            </h4>
            <div className="space-y-3">
              {cameras.map((camera: RecommendationItem, index: number) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-900">{camera.product.name}</h5>
                      <p className="text-gray-600 text-sm">{camera.product.description}</p>
                      <p className="text-purple-600 text-sm mt-1">{camera.reason}</p>
                      <p className="text-gray-500 text-sm">Daudzums: {camera.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {camera.totalPrice > 0 ? `€${camera.totalPrice}+` : 'Pēc pieprasījuma'}
                      </p>
                      <p className="text-xs text-gray-500">Orientējoša cena</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Servers */}
        {servers.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h4 className="font-semibold text-orange-900 mb-4 text-lg flex items-center">
              <Server className="w-5 h-5 mr-2" />
              Serveri
            </h4>
            <div className="space-y-3">
              {servers.map((server: RecommendationItem, index: number) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-900">{server.product.name}</h5>
                      <p className="text-gray-600 text-sm">{server.product.description}</p>
                      <p className="text-orange-600 text-sm mt-1">{server.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">Individuāla konfigurācija</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total Price */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-gray-900 text-lg">Orientējošā cena (licences)</h4>
            <p className="font-bold text-2xl text-gray-900">
              €{totalPrice}
            </p>
          </div>
          {/* <p className="text-gray-600 text-sm mt-2">
            *Cena neietver kameras, serverus un uzstādīšanas darbus
          </p> */}
        </div>

        {/* Notes */}
        {notes.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">Svarīga informācija</h4>
                <ul className="text-yellow-800 space-y-1">
                  {notes.map((note: string, index: number) => (
                    <li key={index} className="text-sm">• {note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleComplete}
            className="flex-1 bg-primary-600 hover:bg-primary-600 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center text-lg"
          >
            <Send className="w-6 h-6 mr-3" />
            Pieprasīt detalizētu piedāvājumu
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
    if (state.result) {
      return renderResultsPage();
    }

    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'multiselect':
        return renderMultiSelectQuestion(currentQuestion);
      case 'number':
        return renderNumberQuestion(currentQuestion);
      case 'yesno':
        return renderYesNoQuestion(currentQuestion);
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        {!state.result && (
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Cctv className="w-12 h-12 text-primary-400 mr-4" />
              <h1 className="text-4xl font-bold text-gray-900">
                Alnet sistēmas konfigurators
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Atbildiet uz jautājumiem, lai saņemtu personalizētu Alnet videonovērošanas un drošības sistēmas risinājumu.
            </p>
          </div>
        )}

        {/* Progress indicator */}
        {!state.result && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {/* <span className="text-sm font-medium text-gray-700">
                {state.step} / {totalSteps}
              </span> */}
              <span className="text-sm text-gray-500">
                {Math.round(((state.step - 1) / (totalSteps - 1)) * 100)}% pabeigts
              </span>
            </div>
            <div className="bg-gray-200 rounded-full h-3">
              <div 
                className="bg-primary-600 rounded-full h-3 transition-all duration-300"
                style={{ width: `${((state.step - 1) / (totalSteps - 1)) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Question content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          {renderCurrentQuestion()}
        </div>

        {/* Navigation */}
        {!state.result && (
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentQuestionIndex === 0}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Atpakaļ
            </button>
            
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex === visibleQuestions.length - 1 ? 'Pabeigt' : 'Tālāk'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
