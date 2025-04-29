import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Experience } from '@/config/experience';

type ExperienceStore = {
  experienceList: Experience[];
  selectedExperience: Experience | null;
  setExperience: (experience: Experience) => void;
};

export const useExperienceStore = create<ExperienceStore>()(
  persist(
    (set) => ({
      selectedExperience: Experience.any,
      experienceList: Object.values(Experience),
      setExperience: (experience: string) => {
        set({ selectedExperience: experience as Experience });
      },
    }),
    {
      name: 'experience-storage',
      partialize: (state) => ({ selectedExperience: state.selectedExperience }),
    },
  ),
);
