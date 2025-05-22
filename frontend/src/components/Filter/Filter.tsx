import { useTranslation } from 'react-i18next';
import { IoFilterSharp } from 'react-icons/io5';

import { useStickyOffset } from '@/hooks/useStickyOffset';

import { ExperienceSelect } from './ExperienceSelect';
import { PeriodSelect } from './PeriodSelect';

export function Filter() {
  const { t } = useTranslation();
  const { ref, offset } = useStickyOffset<HTMLDivElement>('filters');

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
