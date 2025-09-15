import { useConfigurator } from './useConfigurator';
import { ALNET_QUESTIONS, shouldShowQuestion } from '../configurators/alnet/questions';
import { calculateRecommendations } from '../configurators/alnet/rules';
import { AlnetResultsProcessor } from '../configurators/alnet/AlnetResultsProcessor';

export function useAlnetConfigurator() {
  return useConfigurator({
    questions: ALNET_QUESTIONS,
    shouldShowQuestion,
    calculateRecommendations,
    apiEndpoint: '/api/configurator/alnet',
    resultsProcessor: AlnetResultsProcessor,
    notes: [
      'Cenas ir orientējošas un attiecas tikai uz licencēm',
      'Cena neietver kameras, serverus un uzstādīšanas darbus',
    ],
  });
}
