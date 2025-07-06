import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';

import { Experience } from '@/config/experience';

export function useFilters() {
  const selectedPeriod = usePeriodStore((state) => state.selectedPeriod);
  const selectedExperience = useExperienceStore(
    (state) => state.selectedExperience,
  );

  return {
    period: selectedPeriod,
    experience:
      selectedExperience == Experience.any
        ? undefined
        : (selectedExperience ?? undefined),
  };
}
