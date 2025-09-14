import {
  Check,
  AlertCircle,
  Send,
  Home,
  Camera,
  Server,
  ShieldCheck,
  Plus,
} from "lucide-react";
import type { RecommendationItem } from "../../configurators/alnet/types";

interface ResultsPageProps {
  result: RecommendationItem[];
  submitMessage: string;
  showContactForm: boolean;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  isSubmittingResults: boolean;
  updateContactInfo: (field: 'name' | 'email' | 'phone', value: string) => void;
  handleComplete: () => void;
  setShowContactForm: (show: boolean) => void;
  navigate: (path: string) => void;
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
}: ResultsPageProps) {
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Process the recommendations array
  const netstationLicenses = result.filter((r) =>
    ["netstation_4", "netstation_enterprise_4"].includes(r.product.id)
  );

  // Calculate total NetStation licenses
  const totalNetstationLicenses = netstationLicenses.reduce(
    (sum, license) => sum + license.quantity,
    0
  );
  const primaryNetstation = netstationLicenses[0]; // Use first one as primary for display

  const addons = result.filter(
    (r) =>
      r.product.category === "license" &&
      !["netstation_4", "netstation_enterprise_4"].includes(r.product.id)
  );

  const cameras: RecommendationItem[] = [];
  const servers: RecommendationItem[] = [];

  const totalPrice = result.reduce((sum, item) => sum + item.totalPrice, 0);
  const notes = [
    "Cenas ir orientējošas un attiecas tikai uz licencēm",
    "Cena neietver kameras, serverus un uzstādīšanas darbus",
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Check className="w-20 h-20 text-green-600 mx-auto mb-6" />
        <h3 className="text-3xl font-semibold text-gray-900 mb-4">
          Konfiguratora rezultāti
        </h3>
        <p className="text-xl text-gray-600 mb-8">
          Mūsu sistēma ir analizējusi jūsu vajadzības un sagatavoja
          personalizētu risinājumu.
        </p>
      </div>

      {/* Base License */}
      {primaryNetstation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-4 text-lg flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2" />
            Pamata licence{totalNetstationLicenses > 1 ? "s" : ""}
          </h4>
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-medium text-gray-900">
                  {totalNetstationLicenses > 1
                    ? `${totalNetstationLicenses}x `
                    : ""}
                  {primaryNetstation.product.name}
                </h5>
                <p className="text-gray-600 text-sm">
                  {primaryNetstation.product.description}
                </p>
                <p className="text-blue-600 text-sm mt-1">
                  {totalNetstationLicenses > 1
                    ? `${totalNetstationLicenses} licences nepieciešamas lielajam kameru skaitam`
                    : primaryNetstation.reason}
                </p>
                {totalNetstationLicenses > 1 && (
                  <p className="text-gray-500 text-sm mt-1">
                    Katrai licencei ir 4 pamata kanāli (kopā{" "}
                    {totalNetstationLicenses * 4} pamata kanāli)
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  €
                  {formatPrice(
                    netstationLicenses.reduce(
                      (sum, license) => sum + license.totalPrice,
                      0
                    )
                  )}
                </p>
                {totalNetstationLicenses > 1 && (
                  <p className="text-xs text-gray-500">
                    €{formatPrice(primaryNetstation.product.basePrice)} ×{" "}
                    {totalNetstationLicenses}
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
                    <h5 className="font-medium text-gray-900">
                      {addon.product.name}
                    </h5>
                    <p className="text-gray-600 text-sm">
                      {addon.product.description}
                    </p>
                    <p className="text-green-600 text-sm mt-1">
                      {addon.reason}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      €{formatPrice(addon.totalPrice)}
                    </p>
                    {addon.quantity > 1 && (
                      <p className="text-xs text-gray-500">
                        €{formatPrice(addon.product.basePrice)} ×{" "}
                        {addon.quantity}
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
                    <h5 className="font-medium text-gray-900">
                      {camera.product.name}
                    </h5>
                    <p className="text-gray-600 text-sm">
                      {camera.product.description}
                    </p>
                    <p className="text-purple-600 text-sm mt-1">
                      {camera.reason}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Daudzums: {camera.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {camera.totalPrice > 0
                        ? `€${formatPrice(camera.totalPrice)}+`
                        : "Pēc pieprasījuma"}
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
                    <h5 className="font-medium text-gray-900">
                      {server.product.name}
                    </h5>
                    <p className="text-gray-600 text-sm">
                      {server.product.description}
                    </p>
                    <p className="text-orange-600 text-sm mt-1">
                      {server.reason}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      Individuāla konfigurācija
                    </p>
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
          <h4 className="font-semibold text-gray-900 text-lg">
            Orientējošā cena (licences)
          </h4>
          <p className="font-bold text-2xl text-gray-900">
            €{formatPrice(totalPrice)}
          </p>
        </div>
      </div>

      {/* Notes */}
      {notes.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5 mr-4 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-900 mb-2">Svarīgi</h4>
              <ul className="text-yellow-800 space-y-1">
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
            submitMessage.includes("Kļūda:") ||
            submitMessage.includes("Neizdevās")
              ? "bg-red-50 border border-red-200"
              : "bg-green-50 border border-green-200"
          }`}
        >
          <p
            className={
              submitMessage.includes("Kļūda:") ||
              submitMessage.includes("Neizdevās")
                ? "text-red-800"
                : "text-green-800"
            }
          >
            {submitMessage}
          </p>
        </div>
      )}

      {/* Contact form */}
      {showContactForm && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-4 text-lg">
            Jūsu kontaktinformācija
          </h4>
          <p className="text-blue-800 mb-6 text-sm">
            Lūdzu, ievadiet savus kontaktdatus, lai mēs varētu sazināties ar
            jums par detalizētu piedāvājumu.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
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
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
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
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/preces")}
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
            (showContactForm &&
              (!contactInfo.name.trim() || !contactInfo.email.trim()))
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
