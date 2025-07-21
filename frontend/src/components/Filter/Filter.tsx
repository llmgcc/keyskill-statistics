import { useTranslation } from 'react-i18next';
import { IoFilterSharp } from 'react-icons/io5';

import { ExperienceSelect } from './ExperienceSelect';
import { PeriodSelect } from './PeriodSelect';

export function Filter() {
  const { t } = useTranslation();

  return (
    <div className="text z-[1000] text-text" id="filter">
      <div className={`z-40 flex h-10 justify-between rounded p-2`}>
        <div className="flex items-center text-sm">
          <div className="mx-1 text-background-accent">
            <IoFilterSharp />
          </div>
          <div className="ml-1 font-[600] text-text">{t('filters.title')}</div>
        </div>
        <div className="flex items-center text-xs">
          <div className="mx-2 flex w-fit items-center">
            <ExperienceSelect />
          </div>
          <div className="flex items-center">
            <PeriodSelect />
          </div>
        </div>
      </div>
    </div>
  );
}
