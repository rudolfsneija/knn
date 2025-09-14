export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: 'aktualitates' | 'services' | 'preces';
  url: string;
  keywords?: string[];
}

// Static service data that we know won't change often
export const staticServicesData: SearchItem[] = [
  {
    id: 'service-nkl',
    title: 'NKDL prasību realizēšana',
    description:
      'Palīdzam uzņēmumiem izpildīt Nacionālā kiberdrošības likuma prasības un standartus',
    category: 'services',
    url: '/pakalpojumi/nkl-prasibu-realizesana',
    keywords: ['NKL', 'NKDL', 'prasības', 'kiberdrosība', 'likums', 'nacionālais', 'kiberdrošība'],
  },
  {
    id: 'service-wifi',
    title: 'Bezvadu Wi-Fi risinājumi',
    description: 'Uzticami bezvadu interneta risinājumi uzņēmumiem ar modernām drošības iespējām',
    category: 'services',
    url: '/pakalpojumi/bezvadu-wifi-risinajumi',
    keywords: [
      'WiFi',
      'Ruckus',
      'Mikrotik',
      'access point',
      'AP',
      'bezvadu',
      'internets',
      'tīkls',
      'wireless',
      'noma',
    ],
  },
  {
    id: 'service-video',
    title: 'Videonovērošanas sistēmas',
    description: 'Profesionālas videonovērošanas sistēmas uzstādīšana, konfigurācija un noma',
    category: 'services',
    url: '/pakalpojumi/videonovero-sistemas',
    keywords: ['video', 'Alnet', 'Milesight', 'novērošana', 'drošība', 'kameras', 'CCTV', 'noma'],
  },
  {
    id: 'service-training',
    title: 'IT drošības apmācības',
    description:
      'Profesionālas IT drošības apmācības darbiniekiem par kiberdroš ību un drošām praksēm',
    category: 'services',
    url: '/pakalpojumi/it-drosibas-apmacibas',
    keywords: ['apmācības', 'drošība', 'IT', 'lekcijas', 'personāls', 'darbinieki'],
  },
];
