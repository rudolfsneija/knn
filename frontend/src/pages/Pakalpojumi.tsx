export function Pakalpojumi() {
  const services = [
    {
      title: "Konsultācijas",
      description: "Profesionālas konsultācijas jūsu biznesa attīstībai",
      features: ["Biznesa analīze", "Stratēģijas izstrāde", "Risku novērtējums", "Optimizācijas ieteikumi"]
    },
    {
      title: "IT risinājumi",
      description: "Mūsdienīgi tehnoloģiskie risinājumi",
      features: ["Sistēmu izstrāde", "Datu bāzu dizains", "Mākoņa risinājumi", "Tehniskais atbalsts"]
    },
    {
      title: "Projektų vadība",
      description: "Pilna cikla projektu vadība un īstenošana",
      features: ["Plānošana", "Izpilde", "Kontrole", "Rezultātu novērtēšana"]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mūsu pakalpojumi</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Piedāvājam plašu pakalpojumu klāstu, lai atbalstītu jūsu uzņēmuma izaugsmi un attīstību
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Nepieciešama individuāla konsultācija?
          </h2>
          <p className="text-gray-600 mb-6">
            Sazinieties ar mums, lai apspriestu jūsu specifiskās vajadzības
          </p>
          <a
            href="/sazinai"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Pieprasīt konsultāciju
          </a>
        </div>
      </div>
    </div>
  );
}