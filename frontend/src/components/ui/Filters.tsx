import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { Select } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { IoFilterSharp } from 'react-icons/io5';

import { Experience } from '@/config/experience';

type FiltersProps = {};

export function Filters({}: FiltersProps) {
  const { setExperience, selectedExperience, experienceList } =
    useExperienceStore();
  const { setPeriod, selectedPeriod, periodList } = usePeriodStore();
  const { t } = useTranslation();

  return (
    <div className="app-container text sticky top-[48px] z-50 text-text">
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
            <Select.Root
              defaultValue={selectedExperience ?? undefined}
              size={'1'}
              onValueChange={(v) => setExperience(v as Experience)}
            >
              <Select.Trigger className="border-shadow-full cursor-pointer bg-background-primary outline-background-secondary" />
              <Select.Content
                position="popper"
                className="bg-background-primary shadow-md shadow-background-secondary"
              >
                {experienceList.map((e, i) => (
                  <Select.Item
                    key={i}
                    className="cursor-pointer focus:bg-background-secondary"
                    value={e}
                  >
                    <span className="font-[500] text-text">
                      {t('common.experience')}
                    </span>{' '}
                    <span className="text-text-secondary">
                      {t(`experience.${e}`)}
                    </span>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>
          <div className="flex items-center">
            <Select.Root
              defaultValue={String(selectedPeriod) ?? undefined}
              size={'1'}
              onValueChange={(v) => setPeriod(Number(v))}
            >
              <Select.Trigger className="border-shadow-full cursor-pointer bg-background-primary outline-background-secondary" />
              <Select.Content
                position="popper"
                className="bg-background-primary shadow-md shadow-background-secondary"
              >
                {periodList.map((e, i) => (
                  <Select.Item
                    key={i}
                    className="cursor-pointer focus:bg-background-secondary"
                    value={String(e)}
                  >
                    <span className="font-[500] text-text">
                      {t('common.period')}
                    </span>{' '}
                    <span className="text-text-secondary">
                      {e} {t('common.days')}
                    </span>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>
        </div>
      </div>
    </div>
  );
}
