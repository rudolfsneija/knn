import { Cctv, Check, Eye, Shield, Monitor, Clock } from 'lucide-react';

export function VideonoveroSistemas() {
  // const features = [
  //   "Videonovērošanas sistēmu projektēšana",
  //   "Profesionāla uzstādīšana un konfigurācija",
  //   "Attālā piekļuve un monitorings",
  //   "Aprīkojuma noma un tehniskais atbalsts"
  // ];

  const solutions = [
    {
      icon: Eye,
      title: 'HD/4K kameras',
      description: 'Augstas izšķirtspējas kameras ar nakts redzamību un inteliģentām funkcijām',
    },
    {
      icon: Shield,
      title: 'Drošības risinājumi',
      description: 'Kustības noteikšana, sejas atpazīšana un automātiska brīdinājumu sūtīšana',
    },
    {
      icon: Monitor,
      title: 'Centralizēta pārvaldība',
      description: 'Vienota sistēma visu kameru pārvaldībai un ierakstu uzglabāšanai',
    },
    {
      icon: Clock,
      title: '24/7 uzraudzība',
      description: 'Nepārtraukta sistēmas darbības nodrošināšana un tehniskais atbalsts',
    },
  ];

  const benefits = [
    'Uzlabota objekta drošība',
    'Attālā piekļuve no jebkuras vietas',
    'Automātiski brīdinājumi',
    'Pierādījumi incidentu gadījumā',
    'Darbinieku drošības uzraudzība',
    'Profesionāla uzstādīšana',
  ];

  const industries = [
    'Biroju ēkas un uzņēmumi',
    'Rūpniecības objekti',
    'Tirdzniecības centri',
    'Noliktavas un logistikas centri',
    'Privātmājas un dzīvokļi',
    'Izglītības iestādes',
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-primary-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Cctv className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Videonovērošanas sistēmas</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nodarbojamies ar videonovērošanas sistēmu izplatīšanu, uzstādīšanu un nomu dažāda veida
            objektiem
          </p>
        </div>

        {/* Solutions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mūsu risinājumi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <div key={index} className="bg-secondary-50 p-6 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-600 rounded-full mr-4 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{solution.title}</h3>
                      <p className="text-gray-600">{solution.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Industries */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Objektu veidi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((industry, index) => (
              <div key={index} className="bg-secondary-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Cctv className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-900">{industry}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-24 bg-secondary-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Sistēmu ieguvumi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-900">{benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">
            Uzstādīšanas process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Konsultācija</h3>
              <p className="text-gray-600 text-sm">Analizējam objektu un noteicam vajadzības</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Projektēšana</h3>
              <p className="text-gray-600 text-sm">
                Izveidojam sistēmas plānu un izvēlamies kameras
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Uzstādīšana</h3>
              <p className="text-gray-600 text-sm">Profesionāli uzstādām un konfigurējam sistēmu</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Atbalsts</h3>
              <p className="text-gray-600 text-sm">Nodrošinām uzturēšanu un tehnisko atbalstu</p>
            </div>
          </div>
        </div>

        {/* Rental Option */}
        <div className="mb-16 bg-secondary-50 rounded-lg p-8">
          <div className="text-center">
            <Monitor className="w-16 h-16 text-primary-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Aprīkojuma noma</h2>
            <p className="text-lg text-gray-600 mb-6">
              Piedāvājam arī videonovērošanas sistēmu nomu īstermiņa vai sezonālām vajadzībām
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <Check className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                <span className="text-gray-900 font-medium">Ātra uzstādīšana</span>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <Check className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                <span className="text-gray-900 font-medium">Elastīgi nosacījumi</span>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <Check className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                <span className="text-gray-900 font-medium">Pilns atbalsts</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Gatavi uzstādīt videonovērošanas sistēmu?</h2>
          <p className="mb-6">Sazinieties ar mums bezmaksas konsultācijai un objekta apsekošanai</p>
          <a
            href="/sazinai?topic=videonovero-sistemas"
            className="bg-white text-primary-400 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Pieprasīt konsultāciju
          </a>
        </div>
      </div>
    </div>
  );
}
