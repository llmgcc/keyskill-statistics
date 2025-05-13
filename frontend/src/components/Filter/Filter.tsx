import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { useTranslation } from 'react-i18next';
import { IoFilterSharp } from 'react-icons/io5';
import { useShallow } from 'zustand/shallow';

import { Experience } from '@/config/experience';
import { useScreenSize } from '@/hooks/useScreenSize';
import { useStickyOffset } from '@/hooks/useStickyOffset';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/AppSelect';

export function Filter() {
  const { isMobile } = useScreenSize();
  const [setExperience, selectedExperience, experienceList] =
    useExperienceStore(
      useShallow((state) => [
        state.setExperience,
        state.selectedExperience,
        state.experienceList,
      ]),
    );
  const [setPeriod, selectedPeriod, periodList] = usePeriodStore(
    useShallow((state) => [
      state.setPeriod,
      state.selectedPeriod,
      state.periodList,
    ]),
  );
  const { t } = useTranslation();
  const { ref, offset } = useStickyOffset('filters');

  function periodTitle() {
    if (isMobile) {
      return `${selectedPeriod}${t('common.days')[0]}`;
    }
    return `${selectedPeriod} ${t('common.days')}`;
  }

  function experienceTitle() {
    if (isMobile) {
      return t(`experienceShort.${selectedExperience}`);
    }
    return t(`experience.${selectedExperience}`);
  }

  return (
    <div
      className="app-container text sticky z-50 text-text"
      ref={ref}
      style={{ top: offset }}
    >
      <div
        className={`z-40 flex h-10 justify-between rounded border-[1px] border-background-secondary bg-background-primary p-2 !shadow-sm`}
      >
        <div className="flex items-center text-sm">
          <div className="mx-1 text-background-accent">
            <IoFilterSharp />
          </div>
          <div className="ml-1 font-[600] text-text">{t('filters.title')}</div>
        </div>
        <div className="flex items-center text-xs">
          <div className="mx-2 flex items-center">
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
          </div>
          <div className="flex items-center">
            <Select
              defaultValue={String(selectedPeriod)}
              onValueChange={(v) => setPeriod(Number(v))}
            >
              <SelectTrigger>
                <span className="text-text-primary sm:text-xs md:text-sm">
                  {t('common.period')}
                </span>
                <span className="ml-1 text-text-secondary sm:text-xs md:text-sm">
                  {periodTitle()}
                </span>
              </SelectTrigger>

              <SelectContent>
                {periodList.map((period) => (
                  <SelectItem key={period} value={String(period)}>
                    <div className="flex">
                      <div className="mr-1 text-text-primary">
                        {period} {t('common.days')}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
