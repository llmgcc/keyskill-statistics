import { createListCollection } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

import { useScreenSize } from '@/hooks/useScreenSize';
import { usePeriodStore } from '@/store/periodStore';
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
    useShallow(state => [
      state.setPeriod,
      state.selectedPeriod,
      state.periodList,
    ])
  );

  function periodTitle(period: number) {
    if (isMobile) {
      return `${period}${t('common.days')[0]}`;
    }
    return `${period} ${t('common.days')}`;
  }

  const periodCollection = createListCollection({
    items: periodList.map(e => ({
      value: String(e),
      label: periodTitle(e),
    })),
  });

  return (
    <Select
      collection={periodCollection}
      size="xs"
      value={[String(selectedPeriod)]}
      onValueChange={details => setPeriod(Number(details.value?.[0]))}
      className="min-w-max"
    >
      <SelectTrigger
        style={{ width: 'fit-content', minWidth: 'auto' }}
        minWidth={'max-content'}
      >
        <div className="flex min-w-max items-center gap-1">
          <span className="text-text-primary sm:text-xs md:text-sm">
            {t('common.period')}
          </span>
          <span className="text-text-secondary sm:text-xs md:text-sm">
            {periodTitle(selectedPeriod)}
          </span>
        </div>
      </SelectTrigger>

      <SelectContent>
        {periodCollection.items.map(e => (
          <SelectItem key={e.value} item={e}>
            <div className="flex">
              <div className="mr-1 text-text-primary">
                {e.value} {t('common.days')}
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
