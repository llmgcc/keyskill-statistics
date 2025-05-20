import { Fragment } from 'react/jsx-runtime';

import { normalizeData } from './svg-curve';

interface SvgHistProps {
  data: number[];
  width: number;
  height: number;
  color: string;
  strokeWidth?: number;
}

export function SvgHist({ data, width, height, color }: SvgHistProps) {
  const normalized = normalizeData(data, width, height, 0, 0);

  const binWidth = Math.abs(normalized[1][0] - normalized[0][0]) * 0.8;

  return (
    <div style={{ height: 'inherit' }}>
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none slice"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
        </defs>
        {normalized.map((x) => (
          <Fragment key={`${x[0]}-${x[1]}`}>
            <rect
              x={x[0]}
              y={x[1]}
              width={binWidth}
              height="100"
              fill={color}
              stroke={color}
              rx="2"
              ry="1"
            />
          </Fragment>
        ))}
      </svg>
    </div>
  );
}
