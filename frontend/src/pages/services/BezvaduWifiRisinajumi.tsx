import { Wifi, Building2, FlaskConical, Shield } from 'lucide-react';
import { ConfiguratorBanner } from '../../components/configurator/ConfiguratorBanner';

export function BezvaduWifiRisinajumi() {
  const pielietojumi = [
    'Konferenču zālēs',
    'Birojos un uzņēmumos',
    'Viesnīcās',
    'Tirdzniecības centros',
    'Parkos un publiskās vietās',
    'Izglītības iestādēs',
  ];

  const klienti = [
    {
      name: 'Rīgas Valstspilsēta',
      logo: '/logo/ruckus_izvelas/rigas_valstspilseta.png',
      website: 'https://www.riga.lv',
    },
    {
      name: 'Jūrmalas Valstspilsēta',
      logo: '/logo/ruckus_izvelas/jurmalas_valstspilseta.jpeg',
      website: 'https://www.jurmala.lv',
    },
    {
      name: 'RIX',
      logo: '/logo/ruckus_izvelas/rix.png',
      website: 'https://www.riga-airport.com',
    },
    {
      name: 'Latvijas Republikas Saeima',
      logo: '/logo/ruckus_izvelas/saeima.png',
      website: 'https://www.saeima.lv',
    },
    {
      name: 'LMT',
      logo: '/logo/ruckus_izvelas/lmt.png',
      website: 'https://www.lmt.lv',
    },
    {
      name: 'Jelgavas Tehnoloģiju vidusskola',
      logo: '/logo/ruckus_izvelas/jelgavas_tehnologiju_vidusskola.jpg',
      website: 'https://www.jtv.lv',
    },
    {
      name: 'Radisson Blu',
      logo: '/logo/ruckus_izvelas/radisson_blu.png',
      website: 'https://www.radissonhotels.com',
    },
    {
      name: 'AR AGRO',
      logo: '/logo/ruckus_izvelas/ar_agro.jpeg',
      website: 'https://aragro.lv/',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-16">
        {/* Hero sekcija */}
        <div className="text-center mb-20">
          <div className="w-24 h-24 bg-primary-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Wifi className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-10">Wi-Fi risinājumi</h1>

          {/* WiFi Configurator */}
          <ConfiguratorBanner
            title="Sakomplektē savu Wi-Fi"
            description="Izmanto mūsu Ruckus konfigururātoru, un sāc izmantort Ruckus"
            buttonText="Sākt konfigurēt"
            buttonHref="/ruckus-konfigurators"
            // backgroundColor="bg-primary-600"
            backgroundImage="/images/ruckus.png"
          />
        </div>

        {/* Ruckus Wi-Fi risinājumi */}
        <div className="mb-16 bg-secondary-50 rounded-lg p-8">
          <div className="text-center mb-18">
            <div className="mx-auto flex items-center justify-center mb-6 max-w-48">
              <img
                src="/logo/ruckus.webp"
                alt="Ruckus Networks"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kāpēc izvēlēties Ruckus?</h2>
            <p className="text-gray-600">
              Ruckus ir vairāk nekā 20 gadu pieredze Wi-Fi jomā, un uzņēmumam pieder vairākipatenti
              inovatīvās tehnoloģijās. Šīs inovācijas nodrošina stabilus, uzticamus un augstas
              slodzes izturīgus bezvadu risinājumus dažādām vajadzībām. Ruckus Wi-Fi nodrošina ātru
              un drošu tīklu pat vietās ar ļoti lielu lietotāju skaitu, un ir pazīstams visā pasaulē
              kā augstas kvalitātes Wi-Fi standarts.
            </p>
          </div>

          {/* Horizontal divider */}
          {/* <div className="border-t border-2 border-secondary-100 mb-12"></div> */}

          <div className="text-center mb-24">
            <div className="w-16 h-16 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Pielietojums</h3>
            <p className="text-gray-600 mb-8">
              Ruckus ir ideāla izvēle vietās, kur nepieciešams stabils un drošs Wi-Fi, kas spēj
              izturēt lielu lietotāju skaitu un intensīvu slodzi. To veiksmīgi izmanto:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pielietojumi.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-gray-900 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Horizontal divider */}
          {/* <div className="border-t border-2 border-secondary-100 mb-12"></div> */}

          <div className="text-center mb-24">
            <div className="w-16 h-16 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <FlaskConical className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Ruckus tehnoloģijas</h3>
            <div className="flex items-center justify-center mb-4">
              <span className="inline-block bg-secondary-100 text-secondary-700 px-4 py-2 rounded-full font-semibold shadow-sm">
                BeamFlex
              </span>
            </div>
            <p className="text-gray-600 text-lg text-center mb-8">
              Adaptīvo antenau tehnoloģija, kas automātiski pielāgo signālu optimālajā virzienā uz
              klientu. Tā samazinot traucējumus un uzlabojot signāla stiprumu neatkarīgi no ierīces
              signāla saņemšanas leņķa.
            </p>
            <div className="flex justify-center mb-16 px-4">
              <img
                src="/images/ruckus_beamflex.jpg"
                alt="Ruckus BeamFlex tehnoloģija"
                className="rounded-lg shadow-lg w-full max-w-2xl h-auto object-contain"
              />
            </div>

            <div className="flex items-center justify-center mb-4">
              <span className="inline-block bg-secondary-100 text-secondary-700 px-4 py-2 rounded-full font-semibold shadow-sm">
                ChannelFly
              </span>
            </div>
            <p className="text-gray-600 text-lg text-center mb-8">
              Dinamiskā kanālu pārvaldības tehnoloģija, kas reālajā laikā izvēlas mazāk noslogotus
              kanālus, lai nodrošinātu maksimālu tīkla caurlaidspēju un stabilu savienojumu pat
              intensīvas slodzes apstākļos.
            </p>
            <div className="flex justify-center mb-8 px-4">
              <img
                src="/images/ruckus_channelfly.jpg"
                alt="Ruckus ChannelFly tehnoloģija"
                className="rounded-lg shadow-lg w-full max-w-2xl h-auto object-contain"
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 text-lg text-center mb-6">
                Atbalsta jaunākos Wi-Fi standartus — Wi-Fi 6, Wi-Fi 6E un Wi-Fi 7, kas nodrošina
                ātrāku datu pārraidi, zemāku aizturi un plašāku kanālu izmantošanu stabilākam
                savienojumam.
              </p>
              <div className="flex justify-center px-4">
                <img
                  src="/logo/wifi7.png"
                  alt="Wi-FI 7 Certified"
                  className="rounded-lg w-full max-w-48 h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Horizontal divider */}
          {/* <div className="border-t border-2 border-secondary-100 mb-12"></div> */}

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Drošība</h3>
            <p className="text-gray-600 text-lg mb-8">
              Ruckus piedāvā plašas un elastīgas drošības iespējas, kas aizsargā tīklu, lietotājus
              un datus.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Trafika analīze un izsekošana
                </h3>
                <p className="text-gray-600 text-sm">
                  Detalizēta pieslēgšanās mēģinājumu un datplūsmas kontrole palīdz ātri atklāt
                  drošības riskus.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">SSH šifrēšana</h3>
                <p className="text-gray-600 text-sm">
                  Visi pārvaldības dati starp piekļuves punktiem un mākoņserveri tiek šifrēti ar SSH
                  tuneli, nodrošinot drošu darbību arī nepārbaudītos vai nedrošos tīklos.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  WPA2 / WPA3 un 802.1X ar EAP
                </h3>
                <p className="text-gray-600 text-sm">
                  Jaunāko standartu šifrēšana un autentifikācija, ar iespēju diagnosticēt
                  neveiksmīgus pieslēgšanās mēģinājumus.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Dynamic PSK (DPSK)</h3>
                <p className="text-gray-600 text-sm">
                  Katram lietotājam tiek piešķirta individuāla parole, kas var tikt piesaistīta
                  noteiktam VLAN, nodrošinot papildu drošību un izolāciju.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Viesu tīkla izolācija</h3>
                <p className="text-gray-600 text-sm">
                  Viesu ierīces ir nodalītas viena no otras un nevar piekļūt iekšējiem resursiem.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Iebūvēts ugunsmūris un URL filtrācija
                </h3>
                <p className="text-gray-600 text-sm">
                  Samazina lieku vai nevēlamu trafiku, uzlabojot tīkla drošību un kvalitāti.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Administratīvā pārvaldība
                </h3>
                <p className="text-gray-600 text-sm">
                  Vairāku līmeņu piekļuves tiesības, LDAP/SSO integrācija un MFA atbalsts nodrošina
                  drošu administrāciju.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Drošības atjauninājumi</h3>
                <p className="text-gray-600 text-sm">
                  Visas Ruckus ierīces regulāri saņem jaunākos drošības uzlabojumus, kas pasargā no
                  aktuālajiem kiberdraudiem.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Mūsu klienti */}
        <div className="mb-16 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Ruckus izvēlas</h2>
            {/* <p className="text-gray-600 mt-4">
              Uzticamās organizācijas, kas izvēlējušās mūsu Ruckus Wi-Fi risinājumus
            </p> */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {klienti.map((klients, index) => (
              <a
                key={index}
                href={klients.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-lg text-center hover:shadow-sm transition-shadow cursor-pointer group"
              >
                <div className="w-28 h-28 mx-auto mb-4 flex items-center justify-center rounded-lg">
                  <img
                    src={klients.logo}
                    alt={klients.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      // Fallback when image is not found
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `<span class="text-gray-400 text-xs text-center">${klients.name}</span>`;
                    }}
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">
                  {klients.name}
                </h3>
              </a>
            ))}
          </div>
        </div>

        {/* Ruckus video */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Ruckus stāsts Dziesmu un Deju svētkos
          </h2>
          <div className="mx-auto">
            <div className="relative w-full h-0 pb-[52.75%] rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/YJdfjW27gbM?rel=0&modestbranding=1&cc_load_policy=1&hl=lv&cc_lang_pref=lv"
                title="Ruckus stāsts Dziesmu un Deju svētko"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Ar ko sākt? */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Ar ko sākt?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-secondary-50 p-6 rounded-lg shadow-sm text-center relative">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Konsultācija</h3>
              <p className="text-gray-600 text-sm">Analizējam objektu un nosakam vajadzības</p>
            </div>

            <div className="bg-secondary-50 p-6 rounded-lg shadow-sm text-center relative">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Projektēšana</h3>
              <p className="text-gray-600 text-sm">
                Izveidojam detalizētu projekta dokumentāciju un izdevuma tāmi
              </p>
            </div>

            <div className="bg-secondary-50 p-6 rounded-lg shadow-sm text-center relative">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Uzstādīšana</h3>
              <p className="text-gray-600 text-sm">
                Objektā veicam ierīkošanu un sistēmas darbības pārbaudi
              </p>
            </div>

            <div className="bg-secondary-50 p-6 rounded-lg shadow-sm text-center relative">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Atbalsts</h3>
              <p className="text-gray-600 text-sm">
                Nodrošinām personāla apmācību un sistēmas uzturēšanu
              </p>
            </div>
          </div>
        </div>

        {/* Aprīkojuma noma */}
        <div className="mb-16 bg-secondary-50 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Aprīkojuma noma</h2>
          </div>
          <div className="max-w-4xl mx-auto text-center mb-8">
            <p className="text-gray-600 text-lg mb-6">
              Pasākumi ar simtiem vai pat tūkstošiem viesu prasa īpaši stabilu Wi-Fi. Ar Ruckus
              aprīkojuma nomu mēs piedāvājam uzticamu risinājumu – profesionāli uzstādītu un
              pielāgotu tieši jūsu vajadzībām.
            </p>
            <p className="text-gray-600 text-lg">
              Mēs piedāvājam Ruckus Wi-Fi aprīkojuma nomu, nodrošinot visu nepieciešamo, lai jūsu
              pasākuma viesiem būtu uzticams savienojums.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-left">
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-3">•</span>
                <span>
                  <strong className="text-gray-900">Profesionāla uzstādīšana</strong> – mūsu
                  speciālisti veic piekļuves punktu izvietošanu un konfigurēšanu atbilstoši pasākuma
                  vajadzībām.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-3">•</span>
                <span>
                  <strong className="text-gray-900">Pilns tehniskais nodrošinājums</strong> –
                  piegādājam piekļuves punktus, komutatorus un ugunsmūrus, lai tīkls būtu drošs un
                  slodzei izturīgs.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-3">•</span>
                <span>
                  <strong className="text-gray-900">Elastība</strong> – aprīkojuma apjomu pielāgojam
                  pasākuma mērogam – no nelielām konferencēm līdz tūkstošiem dalībnieku.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-3">•</span>
                <span>
                  <strong className="text-gray-900">Drošība</strong> – viesu tīkli ar izolāciju,
                  šifrēta datu pārraide un filtrēšana nodrošina drošu lietošanu bez riskiem.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-3">•</span>
                <span>
                  <strong className="text-gray-900">Atbalsts pasākuma laikā</strong> – pēc
                  nepieciešamības nodrošinām tehnisko uzraudzību, lai viss darbotos nevainojami.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Cenrādis */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Cenrādis</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary-600 border border-primary-200 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-white text-primary-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold">€0</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Bezmaksas konsultācija</h3>
              <p className="text-white text-sm">
                Piesakiet Ruckus pakalpojuma konsultāciju, lai iepazītu un izmēģinātu Rukus bezvada
                tīkla risinājumu.
              </p>
            </div>

            <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-lg font-bold">7,5€</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Mēneša īre</h3>
              <p className="text-gray-600 text-sm">
                Ruckus piekļuves punkta īre ar mākoņpakalpokumu, par vienu AP.
              </p>
            </div>

            <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-lg font-bold">40€+</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Uzstādīšana</h3>
              <p className="text-gray-600 text-sm">
                No 40 EUR/st – Projektēšanas un uzstādīšanas izmaksas.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className=" p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Gatavi uzlabot savu Wi-Fi pieredzi ar Ruckus tehnoloģiju?
          </h2>
          <p className="mb-6">
            Sazinieties ar mums bezmaksas konsultācijai par Ruckus risinājumiem un to, kā mēs varam
            nodrošināt augstas kvalitātes bezvadu interneta savienojumu jūsu vajadzībām
          </p>
          <a
            href="/sazinai?topic=bezvadu-wifi-risinajumi"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block"
          >
            Pieprasīt konsultāciju
          </a>
        </div>
      </div>
    </div>
  );
}
