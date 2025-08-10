import { Check, Award, Users } from 'lucide-react';

export function ParUznemumu() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Par uzņēmumu</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            KNN serviss - jūsu uzticamais partneris kiberdrošības risinājumos. Latvijā reģistrēts uzņēmums, kas specializējas kiberdrošības risinājumos 
              uzņēmumiem, pašnodarbinātajiem un privātpersonām.
          </p>
        </div>

        {/* Kas ir KNN Serviss */}
        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Kas ir KNN Serviss?</h2>
          <div className="bg-gray-50 p-8 rounded-lg">
            <p className="text-lg text-gray-700 leading-relaxed">
              KNN serviss ir Latvijā reģistrēts uzņēmums, kas specializējas kiberdrošības risinājumos 
              uzņēmumiem, pašnodarbinātajiem un privātpersonām.
            </p>
          </div>
        </div> */}

        {/* Mūsu pieredze */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mūsu pieredze</h2>
          <div className="grid s:grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <Check className="w-6 h-6 text-primary-800 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Datortīklu un datorsistēmu administrēšana</span>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <Check className="w-6 h-6 text-primary-800 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Virtualizēto un Node sistēmu uzstādīšana un uzturēšana</span>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <Check className="w-6 h-6 text-primary-800 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Uzņēmumā uzstādīto sistēmu monitorings un automātiskā ziņošana</span>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <Check className="w-6 h-6 text-primary-800 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Iestādes iekārtu žurnālierakstu un auditāciju pierakstu centralizēta vākšana</span>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <Check className="w-6 h-6 text-primary-800 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Drošības politiku izstrāde un ieviešana iestādēs</span>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <Check className="w-6 h-6 text-primary-800 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Lietotājdokumentu automatizēšana specifiskām vajadzībām</span>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <Check className="w-6 h-6 text-primary-800 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Mājaslapu izstrāde ar iespēju automatizēt dokumentu aizpildi</span>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <Check className="w-6 h-6 text-primary-800 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Datortehnikas, biroja tehnikas un serveriekārtu iestatīšana un apkalpošana</span>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <Check className="w-6 h-6 text-primary-800 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Biznesa videi paredzētās bezvadu tīkla risinājumu uzstādīšana un uzturēšana</span>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <Check className="w-6 h-6 text-primary-800 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Videonovērošanas sistēmu uzstādīšana, konfigurēšana un automatizācija</span>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <Check className="w-6 h-6 text-primary-800 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Ēkas vadības sistēmas (BMS) izstrāde mazajiem un vidēji lielajiem objektiem</span>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
              <div className="flex items-start">
                <Check className="w-6 h-6 text-primary-800 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Darbinieku IT jomas un kiberdrošības apmācība</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sertifikāti */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Award className="w-12 h-12 text-primary-800 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Sertifikāti</h2>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                <Award className="w-8 h-8 text-primary-800 mr-4 flex-shrink-0" />
                <span className="font-medium text-gray-900">Juniper Networks Certified Associate, Junos (JNCIA-Junos)</span>
              </div>
              <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                <Award className="w-8 h-8 text-primary-800 mr-4 flex-shrink-0" />
                <span className="font-medium text-gray-900">AWS Certified Cloud Practitioner</span>
              </div>
              <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                <Award className="w-8 h-8 text-primary-800 mr-4 flex-shrink-0" />
                <span className="font-medium text-gray-900">CCNA</span>
              </div>
              <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                <Award className="w-8 h-8 text-primary-800 mr-4 flex-shrink-0" />
                <span className="font-medium text-gray-900">MikroTik Certified Network Associate (MTCNA)</span>
              </div>
              <div className="flex items-center p-4 bg-white rounded-lg shadow-sm md:col-span-2">
                <Award className="w-8 h-8 text-primary-800 mr-4 flex-shrink-0" />
                <span className="font-medium text-gray-900">MikroTik Certified Routing Engineer (MTCRE)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sadarbības partneri */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Users className="w-12 h-12 text-primary-800 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Sadarbības partneri</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">NEIJA T</h3>
              <p className="text-gray-700">
                Kvadraciklu būve, kā arī motoru, amortizatoru serviss ar bagātu pieredzi motosportā.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Maksikoms</h3>
              <p className="text-gray-700">
                SIA Maksikoms tika nodibināta 1998. gadā ar mērķi sniegt augstas kvalitātes IT pakalpojumus 
                korporatīvajiem klientiem. Uzņēmuma veidotie IT risinājumi ļauj mūsu klientiem optimizēt darbu, 
                ietaupīt laiku un līdzekļus dažādu uzdevumu risināšanā.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">FINSEL</h3>
              <p className="text-gray-700">
                SIA FINSEL ir profesionāls grāmatvedības uzņēmums, kas piedāvā plašu pakalpojumu klāstu, 
                tostarp grāmatvedības uzskaiti, nodokļu konsultācijas un finanšu analīzi. Mūsu komanda 
                apvieno pieredzi un zināšanas, lai nodrošinātu klientiem individuālus risinājumus.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
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