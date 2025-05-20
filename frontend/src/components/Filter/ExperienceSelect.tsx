import { useExperienceStore } from '@/store/experienceStore';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

import { Experience } from '@/config/experience';
import { useScreenSize } from '@/hooks/useScreenSize';
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
      useShallow((state) => [
        state.setExperience,
        state.selectedExperience,
        state.experienceList,
      ]),
    );
    
  function experienceTitle() {
    if (isMobile) {
      return t(`experienceShort.${selectedExperience}`);
    }
    return t(`experience.${selectedExperience}`);
  }

  return (
    <Select
      defaultValue={selectedExperience ?? undefined}
      onValueChange={(v) => setExperience(v as Experience)}
    >
      <SelectTrigger>
        <span className="text-text-primary sm:text-xs md:text-sm">
          {t('common.experience')}
        </span>
        <span className="ml-1 text-text-secondary sm:text-xs md:text-sm">
          {experienceTitle()}
        </span>
      </SelectTrigger>
      <SelectContent>
        {experienceList.map((experience) => (
          <SelectItem key={experience} value={experience}>
            <div className="flex">
              <div className="mr-1 text-text-primary">
                {t(`experience.${experience}`)}
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
