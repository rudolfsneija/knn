import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Mail, Send, Facebook, Youtube } from "lucide-react";

export function Sazinai() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const topic = searchParams.get('topic');
    if (topic) {
      setFormData(prev => ({
        ...prev,
        subject: topic
      }));
    }
  }, [searchParams]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage(
        "Paldies! Jūsu ziņojums ir nosūtīts. Mēs sazināsimies ar jums drīzumā."
      );
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Saziņai</h1>
          <p className="text-lg text-gray-600">
            Esam gatavi atbildēt uz jūsu jautājumiem un apspriest sadarbības
            iespējas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Sazinies ar mums
            </h2>

            {submitMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800">{submitMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  E-pasta adrese *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tālruņa numurs
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tēma *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Izvēlēties tēmu</option>
                  <option value="konsultacijas">Konsultācijas</option>
                  <option value="nkl-prasibu-realizesana">NKL prasību realizēšana</option>
                  <option value="it-drosibas-apmacibas">IT drošības apmācības</option>
                  <option value="bezvadu-wifi-risinajumi">Wi-Fi risinājumi</option>
                  <option value="videonovero-sistemas">Videonovērošanas sistēmas</option>
                  <option value="preces">Jautājums par precēm</option>
                  <option value="cits">Cits jautājums</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Ziņojums *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Aprakstiet jūsu vajadzības vai jautājumus..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isSubmitting ? "Sūta..." : "Sūtīt ziņojumu"}
                {!isSubmitting && <Send className="w-5 h-5 ml-2" />}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Kontaktinformācija
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-primary-800 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">E-pasts</h3>
                  <p className="text-gray-600">info@knn.lv</p>
                </div>
              </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Sociālie tīkli
            </h2>

              <a 
                href="https://www.facebook.com/knnserviss" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start group cursor-pointer"
              >
                <Facebook className="w-6 h-6 text-primary-800 group-hover:text-primary-900 mr-4 mt-1 transition-colors" />
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-800 mb-1 transition-colors">Facebook</h3>
                  <p className="text-gray-600 group-hover:text-primary-800 transition-colors">
                    knnserviss
                  </p>
                </div>
              </a>

              <a 
                href="https://www.youtube.com/@KNNServiss" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start group cursor-pointer"
              >
                <Youtube className="w-6 h-6 text-primary-800 group-hover:text-primary-900 mr-4 mt-1 transition-colors" />
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-800 mb-1 transition-colors">YouTube</h3>
                  <p className="text-gray-600 group-hover:text-primary-800 transition-colors">
                    @KNNServiss
                  </p>
                </div>
              </a>
            </div>

            <div className="mt-8 p-6 bg-secondary-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Rekvizīti</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  <span className="font-medium">Nosaukums:</span> SIA KNN Serviss
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Reģ.Nr.:</span> 40203604036
                </p>
                {/* <p className="text-gray-700">
                  <span className="font-medium">E-pasts:</span> info@knn.lv
                </p> */}
                <p className="text-gray-700">
                  <span className="font-medium">Juridiskā adrese:</span> Rožu iela 12, Ozolnieki, Ozolnieku pag., Jelgavas nov., LV-3018
                </p>
              </div>
            </div>
{/* 
            <div className="mt-8 p-6 bg-secondary-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Ātra atbilde</h3>
              <p className="text-gray-600 text-sm">
                Mēs cenšamies atbildēt uz visiem jautājumiem 24 stundu laikā.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
