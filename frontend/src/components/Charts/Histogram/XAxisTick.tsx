import { useTranslation } from 'react-i18next';

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
        style={{ fontSize: '8px' }}
      >
        {formatCompactNumber(value, currentLanguage)}
      </text>
    </g>
  );
};
