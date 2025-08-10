import { Check } from 'lucide-react';

export function ParUznemumu() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Par uzņēmumu</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            KNN ir uzticams partneris biznesa attīstībā ar ilggadēju pieredzi un profesionālu komandu
          </p>
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Mūsu stāsts</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                KNN tika dibināts ar mērķi sniegt kvalitatīvus un inovatīvus risinājumus uzņēmumiem 
                dažādās nozarēs. Mūsu komanda apvieno ilggadēju pieredzi ar mūsdienīgām tehnoloģijām.
              </p>
              <p>
                Mēs ticam, ka katrs klients ir unikāls, tāpēc piedāvājam individuāli pielāgotus 
                risinājumus, kas atbilst specifiski jūsu biznesa vajadzībām.
              </p>
              <p>
                Mūsu misija ir palīdzēt uzņēmumiem sasniegt savus mērķus, nodrošinot profesionālu 
                atbalstu un kvalitatīvus pakalpojumus.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Mūsu vērtības</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="w-6 h-6 text-primary-800 mr-3 mt-0.5" />
                <span><strong>Kvalitāte</strong> - Mēs nekad necompromitējam kvalitāti</span>
              </li>
              <li className="flex items-start">
                <Check className="w-6 h-6 text-primary-800 mr-3 mt-0.5" />
                <span><strong>Inovācijas</strong> - Vienmēr meklējam jaunus risinājumus</span>
              </li>
              <li className="flex items-start">
                <Check className="w-6 h-6 text-primary-800 mr-3 mt-0.5" />
                <span><strong>Uzticamība</strong> - Esam uzticami partneri ilgtermiņā</span>
              </li>
              <li className="flex items-start">
                <Check className="w-6 h-6 text-primary-800 mr-3 mt-0.5" />
                <span><strong>Klientu orientācija</strong> - Klienta vajadzības ir mūsu prioritāte</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-primary-800 text-white rounded-lg p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">10+</div>
              <div className="text-primary-100">Gadi pieredzē</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">200+</div>
              <div className="text-primary-100">Projekti</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">150+</div>
              <div className="text-primary-100">Klienti</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-primary-100">Atbalsts</div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Mūsu komanda</h2>
          <p className="text-lg text-gray-600">
            Profesionāļi ar plašu pieredzi dažādās jomās
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Jānis Bērziņš</h3>
            <p className="text-gray-600 mb-2">Vadītājs</p>
            <p className="text-sm text-gray-500">15 gadi pieredzē biznesa konsultācijās</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Līga Kalnēja</h3>
            <p className="text-gray-600 mb-2">IT vadītāja</p>
            <p className="text-sm text-gray-500">Eksperience tehnoloģiju risinājumos</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Māris Ozols</h3>
            <p className="text-gray-600 mb-2">Projektu vadītājs</p>
            <p className="text-sm text-gray-500">Specializējas lielu projektu vadībā</p>
          </div>
        </div>

        {/* Poga */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Gatavi sākt sadarbību?
          </h2>
          <p className="text-gray-600 mb-6">
            Sazinieties ar mums un apspriedīsim, kā varam palīdzēt jūsu biznesam
          </p>
          <a
            href="/sazinai"
            className="bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-900 transition-colors inline-block"
          >
            Sazināties ar mums
          </a>
        </div>
      </div>
    </div>
  );
}