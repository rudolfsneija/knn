import { Check, AlertCircle, Send, Home } from 'lucide-react';
import type { RecommendationItem } from '../../configurators/types';

interface ResultsPageProps {
  result: RecommendationItem[];
  submitMessage: string;
  showContactForm: boolean;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    comment: string;
  };
  isSubmittingResults: boolean;
  updateContactInfo: (field: 'name' | 'email' | 'phone' | 'comment', value: string) => void;
  handleComplete: () => void;
  setShowContactForm: (show: boolean) => void;
  navigate: (path: string) => void;
  resultsProcessor?: (result: RecommendationItem[]) => React.ReactNode;
  notes?: string[];
}

export function ResultsPage({
  result,
  submitMessage,
  showContactForm,
  contactInfo,
  isSubmittingResults,
  updateContactInfo,
  handleComplete,
  setShowContactForm,
  navigate,
  resultsProcessor,
  notes = [],
}: ResultsPageProps) {
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const totalPrice = result.reduce((sum, item) => sum + item.totalPrice, 0);

  // Use custom results processor if provided, otherwise show generic list
  const renderResults = () => {
    if (resultsProcessor) {
      return resultsProcessor(result);
    }

    // Generic results display
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-secondary-900 mb-4 ml-2 text-lg">
          Ieteicamie produkti ({result.length})
        </h4>
        <div className="space-y-3">
          {result.map((item: RecommendationItem, index: number) => (
            <div key={index} className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-900">
                    {item.quantity > 1 ? `${item.quantity}x ` : ''}
                    {item.product.name}
                  </h5>
                  <p className="text-gray-600 text-sm">{item.product.description}</p>
                  <p className="text-blue-600 text-sm mt-1">{item.reason}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">€{formatPrice(item.totalPrice)}</p>
                  {item.quantity > 1 && (
                    <p className="text-xs text-gray-500">
                      €{formatPrice(item.product.basePrice)} × {item.quantity}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Check className="w-20 h-20 text-success-700 mx-auto mb-6" />
        <h3 className="text-3xl font-semibold text-gray-900 mb-4">Konfiguratora rezultāti</h3>
        <p className="text-xl text-gray-600 mb-12">
          Mūsu sistēma ir analizējusi jūsu vajadzības un sagatavoja personalizētu risinājumu.
        </p>
      </div>

      {/* Render results using custom processor or generic display */}
      {renderResults()}

      {/* Total Price */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-gray-900 text-lg">Orientējošā cena</h4>
          <p className="font-bold text-2xl text-gray-900">€{formatPrice(totalPrice)}</p>
        </div>
      </div>

      {/* Notes */}
      {notes.length > 0 && (
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-6">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-warning-600 mt-0.5 mr-4 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-warning-900 mb-2">Svarīgi</h4>
              <ul className="text-warning-800 space-y-1">
                {notes.map((note: string, index: number) => (
                  <li key={index} className="text-sm">
                    • {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Submit status message */}
      {submitMessage && (
        <div
          className={`rounded-lg p-4 mb-6 ${
            submitMessage.includes('Kļūda:') || submitMessage.includes('Neizdevās')
              ? 'bg-red-50 border border-red-200'
              : 'bg-green-50 border border-green-200'
          }`}
        >
          <p
            className={
              submitMessage.includes('Kļūda:') || submitMessage.includes('Neizdevās')
                ? 'text-red-800'
                : 'text-green-800'
            }
          >
            {submitMessage}
          </p>
        </div>
      )}

      {/* Contact form */}
      {showContactForm && (
        <div className="bg-info-50 border border-info-200 rounded-lg p-6">
          <h4 className="font-semibold text-info-900 mb-4 text-lg">Jūsu kontaktinformācija</h4>
          <p className="text-info-800 mb-6 text-sm">
            Lūdzu, ievadiet savus kontaktdatus, lai mēs varētu sazināties ar jums.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Vārds, uzvārds *
              </label>
              <input
                type="text"
                id="name"
                value={contactInfo.name}
                onChange={(e) => updateContactInfo('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-pasts *
              </label>
              <input
                type="email"
                id="email"
                value={contactInfo.email}
                onChange={(e) => updateContactInfo('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Telefons
              </label>
              <input
                type="tel"
                id="phone"
                value={contactInfo.phone}
                onChange={(e) => updateContactInfo('phone', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Komentārs
            </label>
            <textarea
              id="comment"
              value={contactInfo.comment}
              onChange={(e) => updateContactInfo('comment', e.target.value)}
              rows={2}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
            />
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate('/preces')}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center text-lg"
        >
          <Home className="w-6 h-6 mr-3" />
          Atgriezties pie precēm
        </button>
        {showContactForm && (
          <button
            onClick={() => setShowContactForm(false)}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center text-lg"
          >
            Atcelt
          </button>
        )}
        <button
          onClick={handleComplete}
          disabled={
            isSubmittingResults ||
            (showContactForm && (!contactInfo.name.trim() || !contactInfo.email.trim()))
          }
          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmittingResults ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
              Sūta rezultātus...
            </>
          ) : showContactForm ? (
            <>
              <Send className="w-6 h-6 mr-3" />
              Nosūtīt pieprasījumu
            </>
          ) : (
            <>
              <Send className="w-6 h-6 mr-3" />
              Pieprasīt piedāvājumu
            </>
          )}
        </button>
      </div>
    </div>
  );
}
