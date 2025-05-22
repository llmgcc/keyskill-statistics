import { normalizeData, svgCurveFromPoints } from './svg-curve';

interface SvgPlotProps {
  data: number[];
  width: number;
  height: number;
  color: string;
  strokeWidth?: number;
}

export function SvgPlot({
  data,
  width,
  height,
  color,
  strokeWidth,
}: SvgPlotProps) {
  const normalized = normalizeData(data, width, height, 5, 5);

  const [curve, connection] = svgCurveFromPoints(normalized, height);

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
        <path d={curve} stroke={color} fill="none" strokeWidth={strokeWidth} />
        <path d={curve + connection} fill={color} fillOpacity="0.1" />
      </svg>
    </div>
  );
}
