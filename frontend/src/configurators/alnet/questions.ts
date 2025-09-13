import type { Question, Answers } from './types';

export const ALNET_QUESTIONS: Question[] = [
  {
    id: 'system_functions',
    title: 'Kādas sistēmas funkcionalitātes Jums ir nepieciešamas ar videonovērošanas pamatfunkcijām?',
    description: 'Izvēlieties papildu funkcionalitātes (iespējams arī izvēlēties nevienu no šiem)',
    type: 'multiselect',
    options: [
      {
        id: 'access_control',
        label: 'Piekļuves kontroles sistēmas',
        value: 'access_control'
      },
      {
        id: 'pos_system',
        label: 'Kases aparātu sistēma (POS)',
        value: 'pos_system'
      },
      {
        id: 'io_control',
        label: 'Ievad-izvad ierīču pārvaldība',
        value: 'io_control'
      },
      {
        id: 'building_management',
        label: 'Ēkas vadības sistēma',
        value: 'building_management'
      },
      {
        id: 'external_logs',
        label: 'Žurnālietrakstu ārējā pārvalde',
        value: 'external_logs'
      },
      {
        id: 'plate_recognition',
        label: 'Numurzīmes atpazīšanu/nolasīšanu',
        value: 'plate_recognition'
      },
      {
        id: 'centralized_management',
        label: 'Centralizēta lietotāju/serveru pārvaldība un autentifikācija',
        value: 'centralized_management'
      },
      {
        id: 'video_analytics',
        label: 'Videoanalītikas funkcionalitāte',
        value: 'video_analytics'
      }
    ],
    validation: {
      required: false,
      message: 'Izvēlieties papildu funkcionalitātes'
    }
  },
  {
    id: 'doors_quantity',
    title: 'Cik durvis?',
    type: 'number',
    dependencies: ['system_functions'],
    showCondition: (answers) => {
      const functions = answers.system_functions;
      if (!Array.isArray(functions)) return false;
      return functions.includes('access_control');
    },
    validation: {
      required: true,
      min: 1,
      message: 'Lūdzu norādiet durvju skaitu'
    }
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
      message: 'Lūdzu norādiet kases aparātu skaitu'
    }
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
      message: 'Lūdzu norādiet ievad-izvad ierīču skaitu'
    }
  },
  {
    id: 'analytics_cameras_quantity',
    title: 'Cik kamerām iespējot videoanalītikas funkcionalitāti?',
    type: 'number',
    dependencies: ['system_functions'],
    showCondition: (answers) => {
      const functions = answers.system_functions;
      if (!Array.isArray(functions)) return false;
      return functions.includes('video_analytics');
    },
    validation: {
      required: true,
      min: 1,
      message: 'Lūdzu norādiet kameru skaitu videoanalītikai'
    }
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
        value: 'fixed'
      },
      {
        id: 'ptz_100m',
        label: 'Āra grozāmās (PTZ) (līdz 100m)',
        value: 'ptz_100m'
      },
      {
        id: 'ptz_180m',
        label: 'Āra grozāmās (PTZ) (līdz 180m)',
        value: 'ptz_180m'
      },
      {
        id: 'indoor_fixed',
        label: 'Iekšā stacionārās',
        value: 'indoor_fixed'
      },
      {
        id: 'panorama',
        label: 'Iekšā/āra panorāmas',
        value: 'panorama'
      }
    ],
    validation: {
      required: false,
      message: 'Izvēlieties kameru veidus, ja nepieciešamas kameras'
    }
  },
  {
    id: 'fixed_cameras_quantity',
    title: 'Cik stacionāras kameras vēlaties uzstādīt?',
    type: 'number',
    dependencies: ['camera_types'],
    showCondition: (answers) => {
      const cameraTypes = answers.camera_types;
      if (!Array.isArray(cameraTypes)) return false;
      return cameraTypes.includes('fixed');
    },
    validation: {
      required: true,
      min: 1,
      message: 'Lūdzu norādiet stacionāro kameru skaitu'
    }
  },
  {
    id: 'indoor_fixed_cameras_quantity',
    title: 'Cik iekšā stacionāras kameras vēlaties uzstādīt?',
    type: 'number',
    dependencies: ['camera_types'],
    showCondition: (answers) => {
      const cameraTypes = answers.camera_types;
      if (!Array.isArray(cameraTypes)) return false;
      return cameraTypes.includes('indoor_fixed');
    },
    validation: {
      required: true,
      min: 1,
      message: 'Lūdzu norādiet iekštelpu stacionāro kameru skaitu'
    }
  },
  {
    id: 'ptz_100m_quantity',
    title: 'Cik āra grozāmās (PTZ) kameras līdz 100m vēlaties uzstādīt?',
    type: 'number',
    dependencies: ['camera_types'],
    showCondition: (answers) => {
      const cameraTypes = answers.camera_types;
      if (!Array.isArray(cameraTypes)) return false;
      return cameraTypes.includes('ptz_100m');
    },
    validation: {
      required: true,
      min: 1,
      message: 'Lūdzu norādiet PTZ kameru (līdz 100m) skaitu'
    }
  },
  {
    id: 'ptz_180m_quantity',
    title: 'Cik āra grozāmās (PTZ) kameras līdz 180m vēlaties uzstādīt?',
    type: 'number',
    dependencies: ['camera_types'],
    showCondition: (answers) => {
      const cameraTypes = answers.camera_types;
      if (!Array.isArray(cameraTypes)) return false;
      return cameraTypes.includes('ptz_180m');
    },
    validation: {
      required: true,
      min: 1,
      message: 'Lūdzu norādiet PTZ kameru (līdz 180m) skaitu'
    }
  },
  {
    id: 'panorama_cameras_quantity',
    title: 'Cik iekšā/āra panorāmas kameras vēlaties uzstādīt?',
    type: 'number',
    dependencies: ['camera_types'],
    showCondition: (answers) => {
      const cameraTypes = answers.camera_types;
      if (!Array.isArray(cameraTypes)) return false;
      return cameraTypes.includes('panorama');
    },
    validation: {
      required: true,
      min: 1,
      message: 'Lūdzu norādiet panorāmas kameru skaitu'
    }
  },
  {
    id: 'has_existing_server',
    title: 'Vai Jums jau ir savs videonovērošanas serveris?',
    type: 'yesno',
    validation: {
      required: true,
      message: 'Lūdzu norādiet, vai jums ir serveris'
    }
  }
];

export const getQuestionById = (id: string): Question | undefined => {
  return ALNET_QUESTIONS.find(q => q.id === id);
};

export const getNextQuestion = (currentQuestionId: string, answers: Answers): Question | undefined => {
  const currentIndex = ALNET_QUESTIONS.findIndex(q => q.id === currentQuestionId);
  
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