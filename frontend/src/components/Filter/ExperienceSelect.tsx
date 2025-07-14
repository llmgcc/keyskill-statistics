import { createListCollection } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

import { Experience } from '@/config/experience';
import { useScreenSize } from '@/hooks/useScreenSize';
import { useExperienceStore } from '@/store/experienceStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/AppSelect';

export function ExperienceSelect() {
  const { isMobile } = useScreenSize();
  const { t } = useTranslation();
  const [setExperience, selectedExperience, experienceList] =
    useExperienceStore(
      useShallow(state => [
        state.setExperience,
        state.selectedExperience,
        state.experienceList,
      ])
    );

  function experienceTitle(experience: Experience | null) {
    if (!experience) return null;
    if (isMobile) {
      return t(`experienceShort.${experience}`);
    }
    return t(`experience.${experience}`);
  }

  const experienceCollection = createListCollection({
    items: experienceList.map(e => ({
      value: e,
      label: experienceTitle(e),
    })),
  });

  return (
    <Select
      collection={experienceCollection}
      size="xs"
      value={[selectedExperience ?? Experience.any]}
      onValueChange={details => setExperience(details.value?.[0] as Experience)}
      className="min-w-max"
    >
      <SelectTrigger
        style={{ width: 'fit-content', minWidth: 'auto' }}
        minWidth={'max-content'}
      >
        <div className="flex min-w-max items-center gap-1">
          <span className="text-text-primary sm:text-xs md:text-sm">
            {t('common.experience')}
          </span>
          <span className="text-text-secondary sm:text-xs md:text-sm">
            {experienceTitle(selectedExperience)}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {experienceCollection.items.map(e => (
          <SelectItem key={e.value} item={e}>
            <div className="flex">
              <div className="mr-1 text-text-primary">
                {t(`experience.${e.value}`)}
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
