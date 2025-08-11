import { Check, Award, Users, BicepsFlexed } from 'lucide-react';

const musuPieredze = [
  "Datortīklu un datorsistēmu administrēšana",
  "Virtualizēto un Node sistēmu uzstādīšana un uzturēšana",
  "Uzņēmumā uzstādīto sistēmu monitorings un automātiskā ziņošana",
  "Iestādes iekārtu žurnālierakstu un auditāciju pierakstu centralizēta vākšana",
  "Drošības politiku izstrāde un ieviešana iestādēs",
  "Lietotājdokumentu automatizēšana specifiskām vajadzībām",
  "Mājaslapu izstrāde ar iespēju automatizēt dokumentu aizpildi",
  "Datortehnikas, biroja tehnikas un serveriekārtu iestatīšana un apkalpošana",
  "Biznesa videi paredzētās bezvadu tīkla risinājumu uzstādīšana un uzturēšana",
  "Videonovērošanas sistēmu uzstādīšana, konfigurēšana un automatizācija",
  "Ēkas vadības sistēmas (BMS) izstrāde mazajiem un vidēji lielajiem objektiem",
  "Darbinieku IT jomas un kiberdrošības apmācība"
];

const sertifikati = [
  "Juniper Networks Certified Associate, Junos (JNCIA-Junos)",
  "AWS Certified Cloud Practitioner",
  "CCNA",
  "MikroTik Certified Network Associate (MTCNA)",
  "MikroTik Certified Routing Engineer (MTCRE)"
];

const sadarbribasPartneri = [
  {
    name: "NEIJA T",
    description: "Kvadraciklu būve, kā arī motoru, amortizatoru serviss ar bagātu pieredzi motosportā."
  },
  {
    name: "Maksikoms",
    description: "SIA Maksikoms tika nodibināta 1998. gadā ar mērķi sniegt augstas kvalitātes IT pakalpojumus korporatīvajiem klientiem. Uzņēmuma veidotie IT risinājumi ļauj mūsu klientiem optimizēt darbu, ietaupīt laiku un līdzekļus dažādu uzdevumu risināšanā."
  },
  {
    name: "FINSEL",
    description: "SIA FINSEL ir profesionāls grāmatvedības uzņēmums, kas piedāvā plašu pakalpojumu klāstu, tostarp grāmatvedības uzskaiti, nodokļu konsultācijas un finanšu analīzi. Mūsu komanda apvieno pieredzi un zināšanas, lai nodrošinātu klientiem individuālus risinājumus."
  }
];

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

        {/* Mūsu pieredze */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <BicepsFlexed className="w-12 h-12 text-primary-800 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Mūsu pieredze</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {musuPieredze.map((item, index) => (
              <div 
                key={index}
                className="bg-secondary-100 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-primary-800 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sertifikāti */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Award className="w-12 h-12 text-primary-800 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Sertifikāti</h2>
          </div>
          <div className="bg-secondary-100 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sertifikati.map((sertifikats, index) => (
                <div 
                  key={index}
                  className={`flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                    index === sertifikati.length - 1 && sertifikati.length % 2 !== 0 ? 'md:col-span-2' : ''
                  }`}
                >
                  <Award className="w-6 h-6 text-primary-800 mr-3 flex-shrink-0" />
                  <span className="font-medium text-gray-900 text-sm">{sertifikats}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sadarbības partneri */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Users className="w-12 h-12 text-primary-800 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Sadarbības partneri</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sadarbribasPartneri.map((partneris, index) => (
              <div 
                key={index}
                className="bg-secondary-100 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{partneris.name}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{partneris.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}