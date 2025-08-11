import { FileText, GraduationCap, Wifi, Cctv } from 'lucide-react';

export function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-800 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-6">
              Laipni lūgti KNN Serviss mājaslapā
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Mūsu darbs - Jūsu drošība
            </p>
            <div className="space-x-4">
              <a
                href="/pakalpojumi"
                className="bg-white text-primary-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                Uzzināt vairāk
              </a>
              <a
                href="/sazinai"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-800 transition-colors inline-block"
              >
                Sazināties
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Wi-Fi Quiz Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-800 to-primary-900 rounded-xl p-8 text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex items-center mb-6 lg:mb-0">
                <Wifi className="w-16 h-16 mr-6 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-3">
                    Nepieciešama palīdzība Wi-Fi risinājuma izvēlē?
                  </h2>
                  <p className="text-primary-100 text-lg leading-relaxed">
                    Izmantojiet mūsu ekspertu izveidoto interaktīvo palīgu, lai ātri un viegli atrastu 
                    ideālo Ruckus bezvadu tīkla risinājumu jūsu konkrētajām vajadzībām.
                  </p>
                </div>
              </div>
              <a
                href="/bezvadu-tikla-konfigurators"
                className="bg-white text-primary-800 hover:bg-primary-50 font-semibold py-4 px-8 rounded-lg transition-colors flex items-center flex-shrink-0 text-lg"
              >
                Sākt palīgu
                <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Pakalpojumi Section */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pakalpojumi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-6 bg-secondary-100 rounded-lg">
              <div className="w-16 h-16 bg-primary-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">NKL prasību realizēšana</h3>
              <p className="text-gray-600">
                Nodrošinām obligāto minimālo kiberdrošības prasību ieviešanu un dokumentu kārtošanu visu veidu uzņēmumos.
              </p>
            </div>

            <div className="text-center p-6 bg-secondary-100 rounded-lg">
              <div className="w-16 h-16 bg-primary-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">IT drošības apmācības</h3>
              <p className="text-gray-600">
                Nodrošinām IT drošības apmācības darbiniekiem, koncentrējoties uz svarīgākajiem mūsdienu kiberdrošības aspektiem.
              </p>
            </div>

            <div className="text-center p-6 bg-secondary-100 rounded-lg">
              <div className="w-16 h-16 bg-primary-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bezvadu Wi-Fi risinājumi</h3>
              <p className="text-gray-600">
                Piedāvājam modernu industrijas bezvada tīkla risinājumu, kurš aptver vairākas drošības iespējas un aktuālākās tehniskās iespējas plašam klientu lokam.
              </p>
            </div>

            <div className="text-center p-6 bg-secondary-100 rounded-lg">
              <div className="w-16 h-16 bg-primary-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Cctv className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Videonovērošanas sistēmas</h3>
              <p className="text-gray-600">
                Nodarbojamies ar videonovērošanas sistēmu izplatīšanu, uzstādīšanu un nomu dažāda veida objektiem.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-secondary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Gatavi uzsākt sadarbību?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sazinieties ar mums jau šodien un uzziniet vairāk par mūsu pakalpojumiem
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
