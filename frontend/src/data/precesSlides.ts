import type { Slide } from '../components/Slideshow';

export const precesSlides: Slide[] = [
  {
    id: 'configurators',
    title: 'Pielāgots risinājums',
    // subtitle: 'Izmantojiet mūsu konfigurātorus',
    description:
      'Atrodiet ideālo risinājumu ar mūsu interaktīvajiem konfigurātoriem videonovērošanai un Wi-Fi tīkliem.',
    backgroundColor: '#cfa768',
    textColor: '#f8f8f8ff',
    buttons: [
      {
        text: 'ALNET Konfigurators',
        href: '/alnet-konfigurators',
        variant: 'secondary',
      },
      {
        text: 'Ruckus Konfigurators',
        href: '/ruckus-konfigurators',
        variant: 'secondary',
      },
    ],
  },
  {
    id: 'expert-consultation',
    title: 'Neesat pārliecināts par izvēli?',
    // subtitle: 'Neesat pārliecināts par izvēli?',
    description:
      'Sazinieties ar mūsu ekspertiem bezmaksas konsultācijai. Mēs palīdzēsim atrast labāko risinājumu jūsu projektam.',
    backgroundColor: '#a9a9a9ff',
    textColor: '#f8f8f8ff',
    buttons: [
      {
        text: 'Pieprasīt konsultāciju',
        href: '/sazinai?topic=konsultacijas',
        variant: 'secondary',
      },
    ],
  },
];
