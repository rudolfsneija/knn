import { FileText, Check, Star, PencilRuler, Euro, Computer, ShieldAlert, Scale, ListCheck } from 'lucide-react';

export function NklPrasibuRealizesana() {
  const features = [
    "Nosakot prasības būtisko un svarīgo pakalpojumu sniegšanai un saņemšanai",
    "Uzlabojot IKT darbību drošību", 
    "Definējot atbildības sadalījumu un Nacionālā kiberdrošības centra kompetences", 
    "Nosakot sadarbības ietvarus un kiberdrošības veicināšanas uzdevumus",
    "Laikus prognozēt un novērst kiberapdraudējumus un pārvarēt kiberapdraudējumu sekas",
    "Nodrošināt pakalpojumu konfidencialitātes, integritātes un pieejamības nepārtrauktību"
  ];

  const processSteps = [
    {
      icon: ShieldAlert,
      title: "Būtisko pakalpojuma sniedzēji",
      description: "Interneta infrastruktūra, elektroniskā sakari, uzticamības pakalpojumi, valsts pārvalde, enerģētika, transports, finanšu sektors, veselības aprūpe, ūdenssaimniecība, IKT, kosmosa pakalpojumi un citi stratēgiski svarīgi pakalpojumi"
    },
    {
      icon: FileText,
      title: "Svarīgo pakalpojuma sniedzēji",
      description: "Vidēji un lieli uzņēmumi: pasta pakalpojumi, atkritumu apsaimniekošana, ķīmisko vielu ražošana, pārtikas ražošana, medicīnisko ierīču ražošana, tiešsaistes tirdzniecība, sociālo mediju platformas un citas nozares"
    },
    {
      icon: Computer,
      title: "IT kritiskā infrastruktūra",
      description: "IKT infrastruktūra, kas iekļauta Ministru kabineta apstiprinātajā kritiskās infrastruktūras sarakstā ar augstākajiem drošības standartiem"
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-primary-800 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Scale className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">NKDL prasību realizēšana</h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            KNN Serviss piedāvā uzņēmumiem nodrošināt Nacionālā kiberdrošības likumā (turpmāk - NKDL) noteiktās kiberdrošības prasības, kas tiek aprakstītas NKDL 18. pantā, 19. pantā un 22. pantā minētajiem pakalpojuma sniedzējiem.
          </p>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Likuma mērķis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-secondary-100 p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Check className="w-6 h-6 text-primary-800 mr-4 flex-shrink-0" />
                  <span className="text-gray-900 font-medium">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Kādiem pakalpojuma sniedzējiem attiecas NKDL?</h2>
          
          {/* Three equal columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="bg-secondary-100 p-6 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-800 rounded-full mr-4 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16 bg-secondary-100 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Kāpēc izvēlēties mūs?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Star className="w-12 h-12 text-primary-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Kvalitāte</h3>
              <p className="text-gray-700">Efektīva procesa organizācija un daudzpusīga pieredze</p>
            </div>
            <div className="text-center">
              <ListCheck className="w-12 h-12 text-primary-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pilna atbilstība</h3>
              <p className="text-gray-700">Garantējam atbilstību visām NKDL prasībām un standartiem</p>
            </div>
            <div className="text-center">
              <PencilRuler className="w-12 h-12 text-primary-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalizēta pieeja</h3>
              <p className="text-gray-700">Pielāgojam risinājumus jūsu specifiskajām vajadzībām</p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Cenrādis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-secondary-100 p-6 rounded-lg shadow-sm text-center">
              <Euro className="w-12 h-12 text-primary-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Kiberdrošības prasību ieviešana</h3>
              <p className="text-3xl font-bold text-primary-800 mb-2">no 40 EUR</p>
              <p className="text-gray-700">Vienreizēja maksa par pilnu prasību ieviešanu</p>
            </div>
            <div className="bg-secondary-100 p-6 rounded-lg shadow-sm text-center">
              <Euro className="w-12 h-12 text-primary-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Kiberdrošības prasību uzturēšana</h3>
              <p className="text-3xl font-bold text-primary-800 mb-2">no 10 EUR/mēn.</p>
              <p className="text-gray-700">Nepārtraukta atbilstības nodrošināšana</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary-800 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Gatavi sākt?</h2>
          <p className="mb-6">Sazinieties ar mums, lai uzsāktu NKDL prasību ieviešanu jūsu uzņēmumā</p>
          <a
            href="/sazinai?topic=nkl-prasibu-realizesana"
            className="bg-white text-primary-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Sazināties ar mums
          </a>
        </div>
      </div>
    </div>
  );
}
