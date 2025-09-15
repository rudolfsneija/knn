import { Wifi, Building2, FlaskConical, Shield } from 'lucide-react';
import { ConfiguratorBanner } from '../../components/configurator/ConfiguratorBanner';

export function BezvaduWifiRisinajumi() {
  const pielietojumi = [
    'Konferenču zālēs',
    'Birojos un uzņēmumos',
    'Viesnīcās un restorānos',
    'Tirdzniecības centros',
    'Parkos un stadionos',
    'Izlītības iestādēs',
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
            buttonHref="/alnet-konfigurators"
            backgroundColor="bg-primary-600"
            // backgroundImage="/images/ruckus.png"
          />

          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Bezvadu tīkla nodrošināšana ar Ruckus tehnoloģiju ir lieliska iespēja uzlabot klientu
            vai uzņēmuma bezvadu interneta pieredzi. Ruckus ir pazīstams ar savām augstas kvalitātes
            Wi-Fi risinājumiem, kas nodrošina stabilu savienojumu, lielu jaudu un drošību.
          </p>
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

        {/* Ruckus Wi-Fi risinājumi */}
        <div className="mb-16 bg-secondary-50 rounded-lg p-8">
          <div className="text-center mb-18">
            <div className="mx-auto flex items-center justify-center mb-6 max-w-xs">
              <img
                src="/logo/ruckus.webp"
                alt="Ruckus Networks"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kāpēc izvēlēties Ruckus?</h2>
            <p className="text-gray-600">
              Ruckus ir ar pieredzi Wi-Fi jomā jau vairāk, nekā 20 gadus, kurai pieder vairāki
              patenti, tai skaitā Wi-Fi tehnoloģijās, kuras veido stabilu un slodzes izturīgu Wi-Fi
              risinājumu.
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
              Ruckus ir ideāli derīgs vietās, kur ir nepieciešams pastāvīgs un stabils signāls,
              spējīgs izturēt lielu noslodzi. To var pielietot, piemēram:
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
              Adaptīvās antenas, kas spēj pielāgot signālu optimālā virzienā, izvairoties no
              traucējumiem un uzlabojot signāla stiprumu, neatkarīgi no ierīces novietojuma telpā.
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
              Dinamiskā kanālu pārvaldība, kas izvēlas mazāk noslogotus kanālus reālajā laikā, lai
              maksimizētu caurlaidspēju.
            </p>
            <div className="flex justify-center mb-8 px-4">
              <img
                src="/images/ruckus_channelfly.jpg"
                alt="Ruckus ChannelFly tehnoloģija"
                className="rounded-lg shadow-lg w-full max-w-2xl h-auto object-contain"
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 text-lg text-center">
                Atbalsta un darbojās ar jaunākiem standartiem, piemēram, Wi-Fi 6, Wi-Fi 6E un Wi-Fi
                7, kas nodrošina lielāku datu pārraidi, zemāku aizkaves laiku, plašāku kanālu
                izmantošanu.
              </p>
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
              Ruckus piedāvā elastīgas drošības iespējas un to pārvaldību, ieskaitot trafika analīzi
              un izsekošanu, pieslēgšanās mēģinājumus un citas ar drošības jomu saistītas funkcijas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">SSH šifrēšana</h3>
                <p className="text-gray-600 text-sm">
                  Visi dati, ko piekļuves punkts sūta ir šifrēti ar SSH tuneli. Tas ir noderīgi
                  situācijā, kad izvietot piekļuves punktus dažādos, arī nepārbaudītos vai nedrošos
                  tīklos, vai veidot pārvaldību caur Ruckus mākoņserveri.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">WPA2/WPA3 & 802.1X</h3>
                <p className="text-gray-600 text-sm">
                  Ruckus pieejamās šifrēšanas un autentifikācijas iespējas pie bezvadu tīkla WPA2 un
                  WPA3 un 802.1X ar EAP, ar iespēju diagnosticēt savienojuma kļūdas vai neveiksmīgus
                  savienojumus.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Dinamiskā PSK</h3>
                <p className="text-gray-600 text-sm">
                  Ruckus pieejama arī dinamiskā PSK (Dynamic Pre-Shared Key), kas nodrošina katram
                  terminētam lietotājam individuālu paroli un sadali pa VLAN.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Viesu tīkla izolācija</h3>
                <p className="text-gray-600 text-sm">
                  Viesu tīklā iekārtas ir izolētas viena no otras un nerada iespēju tikt pie
                  iestādes lokālajiem resursiem.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Ugunsmūris & URL filtrācija
                </h3>
                <p className="text-gray-600 text-sm">
                  Ruckus piedāvā savu ugunsmūri un URL filtrācijas iespēju, kas ļauj mazināt arī
                  lieko vai nevajadzīgo trafiku.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Administratīvā pārvaldība
                </h3>
                <p className="text-gray-600 text-sm">
                  Iekārtu administrēšana ir iespējama arī vairākiem cilvēkiem, ar dažādām
                  privilēģijām, kā arī autorizācijas iespējām (LDAP, SSO) un iespējama MFA.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Drošības atjauninājumi</h3>
                <p className="text-gray-600 text-sm">
                  Visas Ruckus tīkla iekārtas saņem jaunākos atjauninājumus drošības jomā, kas
                  garantē nepārtrauktu un stabilu darbu pret kiberuzbrukuma mēģinājumiem.
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
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 text-lg mb-6">
              Piedāvājam elastīgu Ruckus aprīkojuma nomas risinājumu uzņēmumiem, kas vēlas izmantot
              augstas kvalitātes Wi-Fi tehnoloģijas bez lieliem sākotnējiem ieguldījumiem.
            </p>
            <p className="text-gray-600">
              Nomas pakalpojums ietver pilnu tehnisko atbalstu un iespēju pielāgot aprīkojumu
              atbilstoši mainīgajām vajadzībām. Ideāls risinājums īslaicīgiem projektiem, sezonālām
              vajadzībām vai pakāpeniskai sistēmas izvēršanai.
            </p>
          </div>
        </div>

        {/* Cenrādis */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Cenrādis</h2>
          </div>
          <div className="bg-primary-600 border border-primary-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-white text-primary-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl font-bold">€0</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Bezmaksas konsultācija</h3>
            <p className="text-white text-lg max-w-3xl mx-auto">
              Piesakiet Ruckus pakalpojuma konsultāciju, lai iepazītu un izmēģinātu Ruckus bezvadu
              tīkla risinājumu.
            </p>
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
