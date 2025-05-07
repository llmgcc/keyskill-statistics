import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { Select } from "radix-ui";
import { useTranslation } from 'react-i18next';
import { IoFilterSharp } from 'react-icons/io5';

import { Experience } from '@/config/experience';
import { BiChevronDown } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';

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
              onValueChange={(v) => setExperience(v as Experience)}
            >
              <Select.Trigger className="px-2 py-1 flex items-center rounded border-shadow-full cursor-pointer outline-background-secondary bg-background-secondary text-sm focus:shadow-background-gray focus:outline-background-gray  hover:bg-background-gray hover:outline-background-gray hover:shadow-none">
                <Select.Value>
                  <span className='text-text-primary'>{t('common.experience')}</span> <span className='text-text-secondary text-sm'>{t(`experience.${selectedExperience}`)}</span>
                </Select.Value>
                <Select.Icon>
                  <BiChevronDown size={20}/>
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
              <Select.Content
                position="popper"
                className="SelectContent shadow-md rounded-md border-[2px] border-background-secondary bg-background-primary !p-2 shadow-background-secondary"
                sideOffset={5}
                align='end'
              >
                {experienceList.map((experience) => (
                  <Select.Item
                    key={experience}
                    className={`text-sm text-text-primary cursor-pointer focus:bg-background-secondary flex items-center justify-between rounded px-2 py-1 hover:text-background-secondary ${selectedExperience === experience ? 'bg-background-secondary' : ''}`}
                    value={experience}
                  >
                    <div className='flex'>
                      <div className="text-text-primary mr-1">
                        {t(`experience.${experience}`)}
                      </div>
                    </div>
                    <div className="ml-4 text-xs text-green-400">
                      {selectedExperience == experience ? (
                        <FaCheck />
                      ) : null}
                    </div>
                  </Select.Item>
                ))}
              </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
          <div className="flex items-center">
            <Select.Root
              defaultValue={String(selectedPeriod)}
              onValueChange={(v) => setPeriod(Number(v))}
            >
              <Select.Trigger className="px-2 py-1 flex items-center rounded border-shadow-full cursor-pointer outline-background-secondary bg-background-secondary text-sm focus:shadow-background-gray focus:outline-background-gray  hover:bg-background-gray hover:outline-background-gray hover:shadow-none">
                <Select.Value>
                  <span className='text-text-primary'>{t('common.period')}</span> <span className='text-text-secondary text-sm'>{selectedPeriod} {t('common.days')}</span>
                </Select.Value>
                <Select.Icon>
                  <BiChevronDown size={20}/>
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
              <Select.Content
                position="popper"
                className="SelectContent shadow-md rounded-md border-[2px] border-background-secondary bg-background-primary !p-2 shadow-background-secondary"
                sideOffset={5}
                align='end'
              >
                {periodList.map((period) => (
                  <Select.Item
                    key={period}
                    className={`text-sm text-text-primary cursor-pointer focus:bg-background-secondary flex items-center justify-between rounded px-2 py-1 hover:text-background-secondary ${selectedPeriod === period ? 'bg-background-secondary' : ''}`}
                    value={String(period)}
                  >
                    <div className='flex'>
                      <div className="text-text-primary mr-1">
                        {period} {t('common.days')}
                      </div>
                    </div>
                    <div className="ml-4 text-xs text-green-400">
                      {selectedPeriod == period ? (
                        <FaCheck />
                      ) : null}
                    </div>
                  </Select.Item>
                ))}
              </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>
      </div>
    </div>
  );
}
