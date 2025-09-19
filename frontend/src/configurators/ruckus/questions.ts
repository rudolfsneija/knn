import type { Question, Answers } from './types';

export const RUCKUS_QUESTIONS: Question[] = [
  {
    id: 'main_goal',
    title: 'Mērķis',
    type: 'multiselect',
    multipleSelection: false, // Only allow single selection
    options: [
      {
        id: 'rent',
        label: 'Īrēt',
        value: 'rent',
      },
      {
        id: 'purchase_new',
        label: 'Iegādāties',
        value: 'purchase_new',
      },
      {
        id: 'upgrade_existing',
        label: 'Papildināt esošo',
        value: 'upgrade_existing',
      },
    ],
    validation: {
      required: true,
      message: 'Izvēlieties vienu no opcijām',
    },
  },
  {
    id: 'usage_purpose',
    title: 'Kādam nolūkam plānojat izmantot Wi-Fi?',
    type: 'multiselect',
    multipleSelection: true,
    dependencies: ['main_goal'],
    showCondition: (answers) => {
      const goal = answers.main_goal;
      return Array.isArray(goal) && (goal.includes('rent') || goal.includes('purchase_new'));
    },
    options: [
      {
        id: 'public_wifi',
        label: 'Publiska Wi-Fi piekļuve',
        value: 'public_wifi',
      },
      {
        id: 'daily_work',
        label: 'Ikdienas darbs',
        value: 'daily_work',
      },
      {
        id: 'media_transfer',
        label: 'Foto, video pārsūtīšana',
        value: 'media_transfer',
      },
      {
        id: 'streaming',
        label: 'Tiešsaistes vai tiešraides',
        value: 'streaming',
      },
      {
        id: 'education',
        label: 'Mācību procesu nodrošināšanai',
        value: 'education',
      },
      {
        id: 'outdoor_network',
        label: 'Stabila tīkla nodrošinājums ārtelpā',
        value: 'outdoor_network',
      },
      {
        id: 'voip',
        label: 'Telefonijas sistēmas (VoIP)',
        value: 'voip',
      },
    ],
    validation: {
      required: true,
      message: 'Izvēlieties vismaz vienu nolūku',
    },
  },
  {
    id: 'existing_model',
    title: 'Kāds piekļuves punktu modelis Jūs interesē?',
    description: 'Ierakstiet modeļa numuru vai nosaukumu',
    type: 'number', // Using number type as placeholder - would need custom text input component
    dependencies: ['main_goal'],
    showCondition: (answers) => {
      const goal = answers.main_goal;
      return Array.isArray(goal) && goal.includes('upgrade_existing');
    },
    validation: {
      required: true,
      message: 'Lūdzu, norādiet modeļa informāciju',
    },
  },
  {
    id: 'building_type',
    title: 'Kāds ir jūsu ēkas tips?',
    type: 'multiselect',
    multipleSelection: false,
    options: [
      {
        id: 'open_office',
        label: 'Atvērts birojs',
        value: 'open_office',
      },
      {
        id: 'standard_office',
        label: 'Standarta birojs',
        value: 'standard_office',
      },
      {
        id: 'warehouse',
        label: 'Noliktava',
        value: 'warehouse',
      },
      {
        id: 'public_space',
        label: 'Publiska telpa',
        value: 'public_space',
      },
      {
        id: 'outdoor_area',
        label: 'Ārtelpa',
        value: 'outdoor_area',
      },
      {
        id: 'other',
        label: 'Cits',
        value: 'other',
      },
    ],
    validation: {
      required: true,
      message: 'Izvēlieties vienu no opcijām',
    },
  },
  {
    id: 'wall_type',
    title: 'Kāds ir sienu tips jūsu ēkā?',
    type: 'multiselect',
    multipleSelection: true,
    dependencies: ['building_type'],
    showCondition: (answers) => {
      const buildingType = answers.building_type;
      return Array.isArray(buildingType) && !buildingType.includes('outdoor_area');
    },
    options: [
      {
        id: 'light_walls',
        label: 'Vieglas/stapsienas',
        value: 'light_walls',
      },
      {
        id: 'drywall',
        label: 'Reģips',
        value: 'drywall',
      },
      {
        id: 'glass',
        label: 'Stikls',
        value: 'glass',
      },
      {
        id: 'brick',
        label: 'Ķieģelis',
        value: 'brick',
      },
      {
        id: 'concrete',
        label: 'Betons',
        value: 'concrete',
      },
      {
        id: 'metal_covering',
        label: 'Metāla pārklājums',
        value: 'metal_covering',
      },
      {
        id: 'no_walls',
        label: 'Bez sienām',
        value: 'no_walls',
      },
      {
        id: 'other',
        label: 'Cits',
        value: 'other',
      },
    ],
    validation: {
      required: true,
      message: 'Izvēlieties vismaz vienu sienu tipu',
    },
  },
  {
    id: 'coverage_area',
    title: 'Kāda ir kopējā platība, kur nepieciešams Wi-Fi pārklājums?',
    description: 'Norādiet aptuveno platību kvadrātmetros',
    type: 'slider',
    min: 0,
    max: 2000,
    step: 10,
    unit: 'm²',
    validation: {
      required: true,
      min: 1,
      message: 'Lūdzu, norādiet platību',
    },
  },
  {
    id: 'ceilings_height',
    title: 'Ievadiet griestu augstumu',
    // description: 'Norādiet aptuveno griestu augstumu metros',
    type: 'slider',
    min: 2,
    max: 10,
    step: 0.1,
    unit: 'm',
    // tickMarks: [2, 2.5, 3, 4, 5, 8, 10],
    dependencies: ['building_type'],
    showCondition: (answers) => {
      const buildingType = answers.building_type;
      // Only ask about ceiling height for indoor spaces
      return Array.isArray(buildingType) && !buildingType.includes('outdoor_area');
    },
    validation: {
      required: true,
      min: 2,
      message: 'Lūdzu, norādiet griestu augstumu',
    },
  },
  {
    id: 'floor_count',
    title: 'Ievadiet stāvu skaitu',
    type: 'slider',
    min: 1,
    max: 10,
    step: 1,
    tickMarks: [1, 2, 4, 6, 8, 10],
    dependencies: ['building_type'],
    showCondition: (answers) => {
      const buildingType = answers.building_type;
      // Only ask about floors for indoor spaces
      return Array.isArray(buildingType) && !buildingType.includes('outdoor_area');
    },
    validation: {
      required: true,
      min: 1,
      message: 'Lūdzu, norādiet stāvu skaitu',
    },
  },
  {
    id: 'devices_count',
    title: 'Ievadiet aptuveno pieslēgto ierīču skaitu',
    type: 'slider',
    min: 10,
    max: 1000,
    step: 10,
    tickMarks: [10, 250, 500, 750, 1000],
    validation: {
      required: true,
      min: 10,
      message: 'Lūdzu, norādiet ierīču skaitu',
    },
  },
  {
    id: 'active_devices',
    title: 'Cik, provizorsiki, no visām tīkla ierīcēm ir ikdienā aktīvas vienlaikus?',
    type: 'slider',
    min: 0,
    max: 100,
    step: 5,
    unit: '%',
    // tickMarks: [10, 250, 500, 750, 1000],
    validation: {
      required: true,
      min: 1,
      message: 'Lūdzu, norādiet ierīču skaitu',
    },
  },
  {
    id: 'wifi_technology',
    title: 'Kuru Wi-Fi tehnoloģiju atbalsta jūsu gala iekārtas?',
    type: 'multiselect',
    multipleSelection: true,
    options: [
      {
        id: 'wifi_5',
        label: 'Wi-Fi 5 (802.11ac)',
        value: 'wifi_5',
      },
      {
        id: 'wifi_6',
        label: 'Wi-Fi 6 (802.11ax)',
        value: 'wifi_6',
      },
      {
        id: 'wifi_6e',
        label: 'Wi-Fi 6E',
        value: 'wifi_6e',
      },
      {
        id: 'wifi_7',
        label: 'Wi-Fi 7 (802.11be)',
        value: 'wifi_7',
      },
    ],
    validation: {
      required: true,
      message: 'Izvēlieties vismaz vienu Wi-Fi tehnoloģiju',
    },
  },
];

export function shouldShowQuestion(question: Question, answers: Answers): boolean {
  // If question has no showCondition, it should always be shown
  if (!question.showCondition) {
    return true;
  }

  // If question has dependencies, check if all dependencies are answered
  if (question.dependencies) {
    for (const dependencyId of question.dependencies) {
      const dependencyValue = answers[dependencyId];
      if (dependencyValue === undefined || dependencyValue === null) {
        return false; // Don't show until dependency is answered
      }
    }
  }

  // Execute the question's specific show condition
  return question.showCondition(answers);
}

export const getQuestionById = (id: string): Question | undefined => {
  return RUCKUS_QUESTIONS.find((q) => q.id === id);
};

export const getNextQuestion = (
  currentQuestionId: string,
  answers: Answers
): Question | undefined => {
  const currentIndex = RUCKUS_QUESTIONS.findIndex((q) => q.id === currentQuestionId);

  for (let i = currentIndex + 1; i < RUCKUS_QUESTIONS.length; i++) {
    const question = RUCKUS_QUESTIONS[i];

    // Check if question should be shown based on dependencies and conditions
    if (shouldShowQuestion(question, answers)) {
      return question;
    }
  }

  return undefined;
};
