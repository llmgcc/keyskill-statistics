import { useTranslation } from 'react-i18next';

import { useCurrencyStore } from '@/store/currencyStore';

export interface CustomTickProps {
  start: number;
  interval: number;
  payload?: {
    value: number;
  };
  x: number;
  y: number;
}

const formatCompactNumber = (number: number, locale = 'en') => {
  const formatter = new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  });
  return formatter.format(number);
};

export const XAxisTick = ({
  x,
  y,
  payload,
  start,
  interval,
}: CustomTickProps) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const currency = useCurrencyStore(state => state.selectedCurrency);
  const bin = payload?.value ?? 0;
  const value = start + (bin - 1) * interval;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={6}
        textAnchor="middle"
        fill="rgba(var(--color-text-secondary))"
        style={{ fontSize: '10px' }}
      >
        {currency?.currency_abbr ?? ''}
        {formatCompactNumber(value, currentLanguage)}
      </text>
    </g>
  );
};
