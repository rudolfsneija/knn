import type { Slide } from '../components/Slideshow';

export const heroSlides: Slide[] = [
  {
    id: 'configurators',
    title: 'Videonovērošanas konfigurators',
    subtitle: 'Atrodi sev ideālo risinājumu',
    description:
      'Izmanto mūsu interaktīvo rīku, lai noskaidrotu nepieciešamās licences un infrastruktūru savām videonovērošanas sistēmām.',
    backgroundImage: '/images/milesight.jpg',
    textColor: 'white',
    overlay: true,
    buttons: [
      {
        text: 'Sākt',
        href: '/alnet-konfigurators',
        variant: 'primary',
      },
      //   {
      //     text: 'Uzzināt vairāk',
      //     href: '/pakalpojumi/videonovero-sistemas',
      //     variant: 'secondary',
      //   },
    ],
  },
  {
    id: 'nkdl-requirements',
    title: 'Nacionālās kiberdrošības likums (NKDL)',
    subtitle: 'Obligātās kiberdrošības prasības',
    description:
      'Nodrošinām visaptverošu NKDL prasību ieviešanu jūsu uzņēmumā ar profesionālu dokumentāciju un atbalstu.',
    backgroundImage: '/images/europe.jpg',
    textColor: 'white',
    overlay: true,
    buttons: [
      {
        text: 'Uzzināt vairāk',
        href: '/pakalpojumi/nkl-prasibu-realizesana',
        variant: 'primary',
      },
      //   {
      //     text: 'Sazināties',
      //     href: '/sazinai?topic=nkl-prasibu-realizesana',
      //     variant: 'secondary',
      //   },
    ],
  },
  {
    id: 'it-security-training',
    title: 'Kiberdrošības apmācības',
    subtitle: 'Izglītojiet savu komandu',
    description:
      'Profesionālas kiberdrošības apmācības darbiniekiem un IT personālam ar fokusu uz mūsdienu kiberdrošības izaicinājumiem.',
    backgroundImage: '/images/lecture2.jpg',
    textColor: 'white',
    overlay: true,
    buttons: [
      {
        text: 'Uzzināt vairāk',
        href: '/pakalpojumi/it-drosibas-apmacibas',
        variant: 'primary',
      },
      {
        text: 'Pieteikties',
        href: '/sazinai?topic=it-drosibas-apmacibas',
        variant: 'primary',
      },
    ],
  },
  // {
  //   id: 'products-overview',
  //   title: 'Mūsu produktu klāsts',
  //   subtitle: 'Atklājiet plašu risinājumu spektru jūsu vajadzībām',
  //   description:
  //     'Izvēlieties no dažādām kategorijām - videonovērošanas sistēmas, tīkla aprīkojums, IT drošības risinājumi un daudz kas cits.',
  //   backgroundColor: '#e3e3e3ff',
  //   textColor: 'black',
  //   overlay: true,
  //   buttons: [
  //     {
  //       text: 'Skatīt preces',
  //       href: '#categories',
  //       variant: 'primary',
  //     },
  //   ],
  // },
  //   {
  //     id: 'wifi-solutions',
  //     title: 'Wi-Fi risinājumi',
  //     subtitle: 'Moderni bezvadu tīkli',
  //     description: 'Industrijas līmeņa Wi-Fi risinājumi dažādiem objektiem - no maziem birojiem līdz lielām ēkām.',
  //     backgroundColor: '#7c3aed',
  //     textColor: 'white',
  //     overlay: false,
  //     buttons: [
  //       {
  //         text: 'Uzzināt vairāk',
  //         href: '/pakalpojumi/bezvadu-wifi-risinajumi',
  //         variant: 'primary',
  //       },
  //       {
  //         text: 'Konfigurēt',
  //         href: '/konfiguratori',
  //         variant: 'secondary',
  //       },
  //     ],
  //   },
];
