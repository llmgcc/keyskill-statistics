import { useCurrencyStore } from '@/store/currencyStore';
import { useTranslation } from 'react-i18next';

import { ChartTooltip } from './Histogram';

export function SalaryTooltip({ active, payload }: ChartTooltip) {
  const { t } = useTranslation();
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);

  if (active && payload && payload.length) {
    const from = payload[0].payload.from;
    const to = payload[0].payload.to;
    return (
      <div className="rounded border-[1px] border-background-secondary bg-background-primary p-2 shadow-md shadow-background-secondary">
        <div className="text-sm">
          {from.toFixed(0)} - {to.toFixed(0)}
          {selectedCurrency?.currency_abbr}
        </div>
        <div className="text-xs text-text-secondary">
          <span className="font-[600]">{payload[0].payload.count}</span>{' '}
          {t('columns.mentions').toLowerCase()}
        </div>
      </div>
    );
  }
  return null;
}
