import { useConfigurator } from './useConfigurator';
import { RUCKUS_QUESTIONS, shouldShowQuestion } from '../configurators/ruckus/questions';
import { calculateRecommendations } from '../configurators/ruckus/rules';

export function useRuckusConfigurator() {
  return useConfigurator({
    questions: RUCKUS_QUESTIONS,
    shouldShowQuestion,
    calculateRecommendations,
    apiEndpoint: '/api/configurator/ruckus',
  });
}
