import type { Question, Answers } from './types';

export const ALNET_QUESTIONS: Question[] = [
  {
    id: 'system_functions',
    title:
      'Kādas sistēmas funkcionalitātes Jums ir nepieciešamas papildus videonovērošanas pamatfunkcijām?',
    description: 'Izvēlieties papildu funkcionalitātes',
    type: 'multiselect',
    options: [
      {
        id: 'access_control',
        label: 'Piekļuves kontroles sistēmas',
        value: 'access_control',
      },
      {
        id: 'pos_system',
        label: 'Kases aparātu sistēma (POS)',
        value: 'pos_system',
      },
      {
        id: 'io_control',
        label: 'Ievad-izvad ierīču pārvaldība',
        value: 'io_control',
        tooltip:
          'I/O analoga vai digitālā tipa ierīces, kuras var sasaistīt ar VN sistēmu, lai reaģētu uz notikumiem, vai reģistrēt tos kā notikumus. Tie varētu būt signāli no analoga sensoriem, digitālām kamerām.',
      },
      {
        id: 'building_management',
        label: 'Ēkas vadības sistēma',
        value: 'building_management',
      },
      {
        id: 'external_logs',
        label: 'Žurnālietrakstu ārējā pārvalde',
        value: 'external_logs',
      },
      {
        id: 'plate_recognition',
        label: 'Numurzīmes atpazīšanu/nolasīšanu',
        value: 'plate_recognition',
      },
      {
        id: 'centralized_management',
        label: 'Centralizēta lietotāju/serveru pārvaldība un autentifikācija',
        value: 'centralized_management',
      },
      {
        id: 'video_analytics',
        label: 'Videoanalītikas funkcionalitāte',
        value: 'video_analytics',
      },
    ],
    validation: {
      required: false,
      message: 'Izvēlieties papildu funkcionalitātes',
    },
  },
  {
    id: 'doors_quantity',
    title: 'Cik durvis nepieciešams aprīkot ar piekļuves kontroles sistēmu?',
    // description: 'Izvēlieties durvju skaitu, kuras būs aprīkotas ar piekļuves kontroles sistēmu',
    type: 'number',
    // min: 0,
    // max: 50,
    // step: 1,
    // unit: 'm2',
    dependencies: ['system_functions'],
    showCondition: (answers) => {
      const functions = answers.system_functions;
      if (!Array.isArray(functions)) return false;
      return functions.includes('access_control');
    },
    validation: {
      required: true,
      min: 1,
      message: 'Lūdzu norādiet durvju skaitu',
    },
  },
  {
    id: 'cash_registers_quantity',
    title: 'Cik kases aparāti?',
    type: 'number',
    dependencies: ['system_functions'],
    showCondition: (answers) => {
      const functions = answers.system_functions;
      if (!Array.isArray(functions)) return false;
      return functions.includes('pos_system');
    },
    validation: {
      required: true,
      min: 1,
      message: 'Lūdzu norādiet kases aparātu skaitu',
    },
  },
  {
    id: 'io_devices_quantity',
    title: 'Cik ievad-izvad ierīces?',
    type: 'number',
    dependencies: ['system_functions'],
    showCondition: (answers) => {
      const functions = answers.system_functions;
      if (!Array.isArray(functions)) return false;
      return functions.includes('io_control');
    },
    validation: {
      required: true,
      min: 1,
      message: 'Lūdzu norādiet ievad-izvad ierīču skaitu',
    },
  },

  {
    id: 'camera_types',
    title: 'Kādas kameras vēlaties uzstādīt?',
    description: 'Izvēlieties visus kameru veidus, kas nepieciešami Jūsu projektam',
    type: 'multiselect',
    options: [
      {
        id: 'fixed',
        label: 'Stacionārās',
        value: 'fixed',
      },
      {
        id: 'ptz_100m',
        label: 'Āra grozāmās (PTZ) (līdz 100m)',
        value: 'ptz_100m',
      },
      {
        id: 'ptz_180m',
        label: 'Āra grozāmās (PTZ) (līdz 180m)',
        value: 'ptz_180m',
      },
      {
        id: 'indoor_fixed',
        label: 'Iekšā stacionārās',
        value: 'indoor_fixed',
      },
      {
        id: 'panorama',
        label: 'Iekšā/āra panorāmas',
        value: 'panorama',
      },
    ],
    validation: {
      required: false,
      message: 'Izvēlieties kameru veidus, ja nepieciešamas kameras',
    },
  },

  // Fixed cameras
  {
    id: 'fixed_cameras',
    title: 'Stacionārās kameras',
    description: 'Norādiet stacionāro kameru skaitu',
    type: 'dual-number',
    dependencies: ['camera_types', 'system_functions'],
    showCondition: (answers) => {
      const cameraTypes = answers.camera_types;
      if (!Array.isArray(cameraTypes)) return false;
      return cameraTypes.includes('fixed');
    },
    fields: [
      {
        id: 'fixed_cameras_quantity',
        label: 'Stacionārās kameras',
        placeholder: '0',
        validation: {
          required: true,
          min: 0,
          message: 'Norādiet stacionāro kameru skaitu',
        },
      },
      {
        id: 'fixed_cameras_analytics_quantity',
        label: 'Ar videoanalītiku',
        placeholder: '0',
        validation: {
          required: true,
          min: 0,
          message: 'Norādiet kameru ar analītiku skaitu',
        },
      },
    ],
  },

  // Indoor fixed cameras
  {
    id: 'indoor_fixed_cameras',
    title: 'Iekštelpu stacionārās kameras',
    description: 'Norādiet iekštelpu stacionāro kameru skaitu',
    type: 'dual-number',
    dependencies: ['camera_types', 'system_functions'],
    showCondition: (answers) => {
      const cameraTypes = answers.camera_types;
      if (!Array.isArray(cameraTypes)) return false;
      return cameraTypes.includes('indoor_fixed');
    },
    fields: [
      {
        id: 'indoor_fixed_cameras_quantity',
        label: 'Stacionārās kameras',
        placeholder: '0',
        validation: {
          required: true,
          min: 0,
          message: 'Norādiet stacionāro kameru skaitu',
        },
      },
      {
        id: 'indoor_fixed_cameras_analytics_quantity',
        label: 'Ar videoanalītiku',
        placeholder: '0',
        validation: {
          required: true,
          min: 0,
          message: 'Norādiet kameru ar analītiku skaitu',
        },
      },
    ],
  },

  // PTZ 100m cameras
  {
    id: 'ptz_100m_cameras',
    title: 'PTZ kameras (līdz 100m)',
    description: 'Norādiet PTZ kameru skaitu',
    type: 'dual-number',
    dependencies: ['camera_types', 'system_functions'],
    showCondition: (answers) => {
      const cameraTypes = answers.camera_types;
      if (!Array.isArray(cameraTypes)) return false;
      return cameraTypes.includes('ptz_100m');
    },
    fields: [
      {
        id: 'ptz_100m_cameras_quantity',
        label: 'PTZ kameras',
        placeholder: '0',
        validation: {
          required: true,
          min: 0,
          message: 'Norādiet parasto PTZ kameru skaitu',
        },
      },
      {
        id: 'ptz_100m_cameras_analytics_quantity',
        label: 'PTZ ar videoanalītiku',
        placeholder: '0',
        validation: {
          required: true,
          min: 0,
          message: 'Norādiet PTZ kameru ar analītiku skaitu',
        },
      },
    ],
  },

  // PTZ 180m cameras
  {
    id: 'ptz_180m_cameras',
    title: 'PTZ kameras (līdz 180m)',
    description: 'Norādiet PTZ kameru skaitu',
    type: 'dual-number',
    dependencies: ['camera_types', 'system_functions'],
    showCondition: (answers) => {
      const cameraTypes = answers.camera_types;
      if (!Array.isArray(cameraTypes)) return false;
      return cameraTypes.includes('ptz_180m');
    },
    fields: [
      {
        id: 'ptz_180m_cameras_quantity',
        label: 'PTZ kameras',
        placeholder: '0',
        validation: {
          required: true,
          min: 0,
          message: 'Norādiet parasto PTZ kameru skaitu',
        },
      },
      {
        id: 'ptz_180m_cameras_analytics_quantity',
        label: 'PTZ ar videoanalītiku',
        placeholder: '0',
        validation: {
          required: true,
          min: 0,
          message: 'Norādiet PTZ kameru ar analītiku skaitu',
        },
      },
    ],
  },

  // Panorama cameras
  {
    id: 'panorama_cameras',
    title: 'Panorāmas kameras',
    description: 'Norādiet panorāmas kameru skaitu',
    type: 'dual-number',
    dependencies: ['camera_types', 'system_functions'],
    showCondition: (answers) => {
      const cameraTypes = answers.camera_types;
      if (!Array.isArray(cameraTypes)) return false;
      return cameraTypes.includes('panorama');
    },
    fields: [
      {
        id: 'panorama_cameras_quantity',
        label: 'Panorāmas kameras',
        placeholder: '0',
        validation: {
          required: true,
          min: 0,
          message: 'Norādiet panorāmas kameru skaitu',
        },
      },
      {
        id: 'panorama_cameras_analytics_quantity',
        label: 'Panorāmas ar videoanalītiku',
        placeholder: '0',
        validation: {
          required: true,
          min: 0,
          message: 'Norādiet panorāmas kameru ar analītiku skaitu',
        },
      },
    ],
  },

  {
    id: 'has_existing_server',
    title: 'Vai Jums jau ir savs videonovērošanas serveris?',
    type: 'yesno',
    validation: {
      required: true,
      message: 'Lūdzu norādiet, vai jums ir serveris',
    },
  },
];

export const getQuestionById = (id: string): Question | undefined => {
  return ALNET_QUESTIONS.find((q) => q.id === id);
};

export const getNextQuestion = (
  currentQuestionId: string,
  answers: Answers
): Question | undefined => {
  const currentIndex = ALNET_QUESTIONS.findIndex((q) => q.id === currentQuestionId);

  for (let i = currentIndex + 1; i < ALNET_QUESTIONS.length; i++) {
    const question = ALNET_QUESTIONS[i];

    // Check if question should be shown based on dependencies and conditions
    if (!question.showCondition || question.showCondition(answers)) {
      return question;
    }
  }

  return undefined;
};

export const shouldShowQuestion = (question: Question, answers: Answers): boolean => {
  if (!question.showCondition) {
    return true;
  }
  return question.showCondition(answers);
};
