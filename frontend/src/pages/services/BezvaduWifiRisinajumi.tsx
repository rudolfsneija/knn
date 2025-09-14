import { Wifi, Check, Headset, Wrench, RadioReceiver, BookOpen } from 'lucide-react';

export function BezvaduWifiRisinajumi() {
  const features = [
    "Visaptverošas konsultācijas un Wi-Fi risinājumu plānošana", 
    "Ruckus aprīkojuma pārdošana un piegāde", 
    "Profesionāla montāža un optimāla uzstādīšana", 
    "Detalizēta apmācība par iekārtu izmantošanu un uzturēšanu"
  ];

  const solutions = [
    {
      icon: Headset,
      title: "Konsultācijas un plānošana",
      description: "Konsultanti un inženieri palīdz klientam izstrādāt piemērotu Wi-Fi risinājumu atbilstoši viņu vajadzībām un videi"
    },
    {
      icon: RadioReceiver,
      title: "Pārdošana un iekārtu piegāde",
      description: "Ruckus aprīkojuma pārdošana, nodrošinot visus nepieciešamos maršrutētājus, piekļuves punktus un citus komponentus"
    },
    {
      icon: Wrench,
      title: "Montāža un uzstādīšana",
      description: "Profesionāla montāža un uzstādīšana, lai nodrošinātu optimālu efektivitāti un segumu klienta telpās vai teritorijā"
    },
    {
      icon: BookOpen,
      title: "Apmācība un atbalsts",
      description: "Apmācība par Ruckus iekārtu konfigurēšanu, uzturēšanu un problēmu novēršanu, kā arī nepārtraukts tehniskais atbalsts"
    }
  ];

  const technologies = [
    "Ruckus Access Points un maršrutētāji",
    "Augstas kvalitātes Wi-Fi risinājumi", 
    "Stabils savienojums un liela jauda",
    "Uzņēmuma līmeņa drošība",
    "Profesionāla montāža un uzstādīšana",
    "Iekārtu īres pakalpojumi"
  ];

  const benefits = [
    "Augstas kvalitātes un uzticami bezvadu interneta savienojumi",
    "Stabils savienojums ar lielu jaudu un drošību",
    "Piemēroti dažādām nozarēm un dzīves situācijām",
    "Iekārtu īres iespējas kā alternatīva iegādei",
    "Tehniskā un uzņēmējdarbības ekspertīze",
    "Visaptverošs un efektīvs risinājums klientiem"
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero sekcija */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-primary-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Wifi className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Wi-Fi risinājumi</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Bezvadu tīkla nodrošināšana ar Ruckus tehnoloģiju ir lieliska iespēja uzlabot klientu vai uzņēmuma bezvadu interneta pieredzi. Ruckus ir pazīstams ar savām augstas kvalitātes Wi-Fi risinājumiem, kas nodrošina stabilu savienojumu, lielu jaudu un drošību.
          </p>
        </div>

        {/* Ruckus video */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Ruckus stāsts Dziesmu un Deju svētkos</h2>
          <div className="mx-auto">
            <div className="relative w-full h-0 pb-[52.75%] rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/YJdfjW27gbM"
                title="Ruckus stāsts Dziesmu un Deju svētko"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Ruckus Wi-Fi risinājumi */}
        <div className="mb-16 bg-secondary-50 rounded-lg p-8">
          <div className="text-center mb-8">

            <h2 className="text-3xl font-bold text-gray-900">Ruckus Wi-Fi risinājumi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technologies.map((technology, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <Check className="w-6 h-6 text-primary-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-900 font-medium">{technology}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Solutions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Pakalpojuma galvenās darbības</h2>
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
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{solution.title}</h3>
                      <p className="text-gray-600 text-sm">{solution.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Ko iekļauj mūsu pakalpojums</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-secondary-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-900">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Iekārtu īres pakalpojums */}
        <div className="mb-16 bg-secondary-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Iekārtu īres pakalpojums</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600">
              Piedāvājam iespēju klientiem izmantot augstas kvalitātes Ruckus aprīkojumu bez lieliem sākotnējiem ieguldījumiem, 
              nodrošinot elastīgumu un rentablu risinājumu dažādām vajadzībām.
            </p>
          </div>
        </div>

        {/* Kāpēc izvēlēties mūsu risinājumus */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Kāpēc izvēlēties mūsu risinājumus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-900">{benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Gatavi uzlabot savu Wi-Fi pieredzi ar Ruckus tehnoloģiju?</h2>
          <p className="mb-6">Sazinieties ar mums bezmaksas konsultācijai par Ruckus risinājumiem un to, kā mēs varam nodrošināt augstas kvalitātes bezvadu interneta savienojumu jūsu vajadzībām</p>
          <a
            href="/sazinai?topic=bezvadu-wifi-risinajumi"
            className="bg-white text-primary-400 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Pieprasīt konsultāciju
          </a>
        </div>
      </div>
    </div>
  );
}
