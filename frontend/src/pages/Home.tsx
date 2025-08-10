import { CheckCircle, Zap, Users } from 'lucide-react';

export function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-800 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mūsu pakalpojumi
            </h2>
            {/* <p className="text-lg text-gray-600">
              Profesionāli risinājumi jūsu uzņēmuma vajadzībām
            </p> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-6 bg-secondary-100 rounded-lg">
              <div className="w-16 h-16 bg-primary-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">NKL prasību realizēšana</h3>
              {/* <p className="text-gray-600">
                Mēs nodrošinām augstāko kvalitāti visos mūsu pakalpojumos
              </p> */}
            </div>

            <div className="text-center p-6 bg-secondary-100 rounded-lg">
              <div className="w-16 h-16 bg-primary-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Uzņēmumu IT drošība</h3>
              {/* <p className="text-gray-600">
                Ātri un efektīvi risinājumi jūsu biznesa vajadzībām
              </p> */}
            </div>

            <div className="text-center p-6 bg-secondary-100 rounded-lg">
              <div className="w-16 h-16 bg-primary-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Biznesa Wi-Fi risinājumi</h3>
              {/* <p className="text-gray-600">
                Nepārtraukts klientu atbalsts un profesionālas konsultācijas
              </p> */}
            </div>

            <div className="text-center p-6 bg-secondary-100 rounded-lg">
              <div className="w-16 h-16 bg-primary-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Videonovērošanas sistēmas</h3>
              {/* <p className="text-gray-600">
                Nepārtraukts klientu atbalsts un profesionālas konsultācijas
              </p> */}
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
