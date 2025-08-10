import { FileText, GraduationCap, Wifi, Cctv, Check } from 'lucide-react';

export function Pakalpojumi() {
  const services = [
    {
      title: "NKL prasību realizēšana",
      description: "Nodrošinām obligāto minimālo kiberdrošības prasību ieviešanu un dokumentu kārtošanu visu veidu uzņēmumos",
      icon: FileText,
      features: [
        "Kiberdrošības politiku izstrāde", 
        "Riska novērtējuma dokumentācija", 
        "Atbilstības audits", 
        "Dokumentu kārtošana un uzturēšana"
      ]
    },
    {
      title: "IT drošības apmācības",
      description: "Nodrošinām IT drošības apmācības darbiniekiem, koncentrējoties uz svarīgākajiem mūsdienu kiberdrošības aspektiem",
      icon: GraduationCap,
      features: [
        "Darbinieku kiberdrošības apmācības", 
        "Phishing un sociālās inženierijas izglītība", 
        "Drošas paroles un autentifikācijas prakses", 
        "Incidentu reaģēšanas procedūras"
      ]
    },
    {
      title: "Bezvadu Wi-Fi risinājumi",
      description: "Piedāvājam modernu industrijas bezvada tīkla risinājumu, kurš aptver vairākas drošības iespējas un aktuālākās tehniskās iespējas plašam klientu lokam",
      icon: Wifi,
      features: [
        "Uzņēmuma Wi-Fi tīklu projektēšana", 
        "Drošu bezvadu tīklu ieviešana", 
        "Tīkla veiktspējas optimizācija", 
        "Tehniskais atbalsts un uzturēšana"
      ]
    },
    {
      title: "Videonovērošanas sistēmas",
      description: "Nodarbojamies ar videonovērošanas sistēmu izplatīšanu, uzstādīšanu un nomu dažāda veida objektiem",
      icon: Cctv,
      features: [
        "Videonovērošanas sistēmu projektēšana", 
        "Profesionāla uzstādīšana un konfigurācija", 
        "Attālā piekļuve un monitorings", 
        "Aprīkojuma noma un tehniskais atbalsts"
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mūsu pakalpojumi</h1>
          {/* <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Piedāvājam plašu pakalpojumu klāstu, lai atbalstītu jūsu uzņēmuma izaugsmi un attīstību
          </p> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">{service.title}</h3>
                <p className="text-gray-600 mb-6 text-center">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-primary-800 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="bg-secondary-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Nepieciešama individuāla konsultācija?
          </h2>
          <p className="text-gray-600 mb-6">
            Sazinieties ar mums, lai apspriestu jūsu specifiskās vajadzības
          </p>
          <a
            href="/sazinai"
            className="bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-900 transition-colors inline-block"
          >
            Pieprasīt konsultāciju
          </a>
        </div>
      </div>
    </div>
  );
}