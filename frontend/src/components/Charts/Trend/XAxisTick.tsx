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

export const XAxisTick = ({
  x,
  y,
  payload,
  start,
  interval,
}: CustomTickProps) => {
  const { i18n } = useTranslation();

  const bin = payload?.value ?? 0;
  const timestamp = start + (bin - 1) * interval;
  const date = new Date(timestamp);

  const formattedDate = date.toLocaleDateString(i18n.language, {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

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
        {formattedDate}
      </text>
    </g>
  );
};
