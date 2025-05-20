import { usePeriodStore } from '@/store/periodStore';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

import { useScreenSize } from '@/hooks/useScreenSize';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/AppSelect';

export function PeriodSelect() {
  const { isMobile } = useScreenSize();
  const { t } = useTranslation();
  const [setPeriod, selectedPeriod, periodList] = usePeriodStore(
    useShallow((state) => [
      state.setPeriod,
      state.selectedPeriod,
      state.periodList,
    ]),
  );

  function periodTitle() {
    if (isMobile) {
      return `${selectedPeriod}${t('common.days')[0]}`;
    }
    return `${selectedPeriod} ${t('common.days')}`;
  }
  
  return (
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
  );
}
