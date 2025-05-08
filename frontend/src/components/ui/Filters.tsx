import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { useTranslation } from 'react-i18next';
import { IoFilterSharp } from 'react-icons/io5';

import { Experience } from '@/config/experience';
import { useStickyOffset } from '@/hooks/useStickyOffset';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/AppSelect';

export function Filters() {
  const { setExperience, selectedExperience, experienceList } =
    useExperienceStore();
  const { setPeriod, selectedPeriod, periodList } = usePeriodStore();
  const { t } = useTranslation();
  const { ref, offset } = useStickyOffset('filters');

  return (
    <div
      className="app-container text sticky top-[48px] z-50 text-text"
      ref={ref}
      style={{ top: offset }}
    >
      <div
        className={`z-40 flex h-10 justify-between rounded border-[1px] border-background-secondary bg-background-primary p-2 !shadow-sm`}
      >
        <div className="flex items-center text-sm">
          <div className="mx-1">
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
                </span>{' '}
                <span className="text-text-secondary sm:text-xs md:text-sm">
                  {t(`experience.${selectedExperience}`)}
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
                </span>{' '}
                <span className="text-text-secondary sm:text-xs md:text-sm">
                  {selectedPeriod} {t('common.days')}
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
