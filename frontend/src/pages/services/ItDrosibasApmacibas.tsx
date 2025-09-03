import { GraduationCap, Check, Monitor, GitFork, Shield, Brain, MonitorCog, Building } from 'lucide-react';

export function ItDrosibasApmacibas() {
  const features = [
    "Kas ir kiberdrošība un kāpēc tā ir svarīga",
    "Biežākie kiberdrošības draudi (piemēram, phishing, malware, ransomware)",
    "Kā izveidot un uzturēt drošas paroles",
    "Sociālās inženierijas uzbrukumi un kā no tiem izvairīties",
    "Droša interneta pārlūkošana un datu šifrēšana",
    "Mobilā drošība un attālinātā darba drošība",
    "Ko darīt, ja notiek drošības incidents",
    "Kā ziņot par drošības pārkāpumiem un incidentiem"
  ];

  const trainingModules = [
    {
      icon: Brain,
      title: "Izpratnes veicināšana",
      description: "Sniegt darbiniekiem zināšanas par jaunākajiem kiberdrošības draudiem un riskiem. Izglītot par datu aizsardzības un privātuma jautājumiem, ievērojot normatīvos aktus un labākās prakses."
    },
    {
      icon: MonitorCog,
      title: "Praktiskas zināšanas",
      description: "Nodrošināt praktiskas iemaņas, kā atpazīt un novērst drošības incidentus. Mācīt pareizu tehnoloģiju un programmatūras lietošanu, lai nodrošinātu drošu darba vidi."
    },
    {
      icon: Shield,
      title: "Sistēmu aizsardzība",
      description: "Apmācīt par efektīvu paroļu pārvaldību un divu faktoru autentifikācijas izmantošanu. Informēt par drošības protokoliem un procedūrām, kas nepieciešamas uzņēmuma IT infrastruktūras aizsardzībai."
    }
  ];

  const benefits = [
    "Pieredzējoši instruktori - IT drošības eksperti ar plašu pieredzi",
    "Praktiskas nodarbības - teorētiskā un praktiskā daļa reālajam darbam",
    "Pielāgojams saturs - programmas pielāgotas uzņēmuma vajadzībām",
    "Aktuāls saturs - balstīts uz CERT.LV informāciju",
    "Samazina kiberdrošības riskus uzņēmumā",
    "Palielina darbinieku informētību par draudiem"
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-primary-800 rounded-full mx-auto mb-6 flex items-center justify-center">
            <GraduationCap className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">IT drošības apmācības</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Piedāvājam augstas kvalitātes IT drošības apmācības, kas ir paredzētas, lai paaugstinātu Jūsu uzņēmuma darbinieku izpratni par aktuālajiem drošības jautājumiem un jaunāko tehnoloģiju izmantošanu drošā veidā.
          </p>
        </div>

        {/* Training Modules */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Apmācību mērķi</h2>
          <div className="grid grid-cols-1 gap-6">
            {trainingModules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <div key={index} className="bg-secondary-100 p-6 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-800 rounded-full mr-4 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
                      <p className="text-gray-600 text-sm">{module.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Training Formats */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Apmācību formāti</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center bg-secondary-100 p-6 rounded-lg shadow-sm">
              <Building className="w-12 h-12 text-primary-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Klātienes apmācības</h3>
              <p className="text-gray-600">Interaktīvas apmācības jūsu uzņēmuma telpās ar praktiskiem piemēriem</p>
            </div>
            <div className="text-center bg-secondary-100 p-6 rounded-lg shadow-sm">
              <Monitor className="w-12 h-12 text-primary-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Online apmācības</h3>
              <p className="text-gray-600">Attālinātās apmācības ar interaktīviem materiāliem un testiem</p>
            </div>
            <div className="text-center bg-secondary-100 p-6 rounded-lg shadow-sm">
              <GitFork className="w-12 h-12 text-primary-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hibrīda formāts</h3>
              <p className="text-gray-600">Kombinēts formāts ar klātienes un online elementiem</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16 bg-secondary-100 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Apmācību saturs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <Check className="w-6 h-6 text-primary-800 mr-4 flex-shrink-0" />
                  <span className="text-gray-900 font-medium">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CERT.LV Section */}
        <div className="mb-16 bg-secondary-100 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Apmācību avoti</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 mb-4">
              Apmācību saturs ir izstrādāts, balstoties uz jaunāko informāciju no <strong>CERT.LV</strong> mājaslapas, 
              kas ir Latvijas valsts kiberdrošības eksperti.
            </p>
            <p className="text-gray-600">
              Tas nodrošina, ka mūsu piedāvātās apmācības ir balstītas uz aktuālākajām zināšanām un 
              labāko praksi šajā jomā.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Kāpēc izvēlēties mūsu apmācības?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-primary-800 mr-3 flex-shrink-0" />
                  <span className="text-gray-900 font-medium">{benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary-800 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Gatavi uzlabot savu komandas kiberdrošības zināšanas?</h2>
          <p className="mb-6">Sazinieties ar mums, lai uzzinātu vairāk par mūsu piedāvātajām IT drošības apmācībām un kā mēs varam palīdzēt Jūsu uzņēmumam nodrošināt drošāku darba vidi.</p>
          <a
            href="/sazinai?topic=it-drosibas-apmacibas"
            className="bg-white text-primary-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Pieprasīt apmācības
          </a>
        </div>
      </div>
    </div>
  );
}
