import { memo, useMemo } from 'react';
import { curveCardinal } from 'd3-shape';
import { useTranslation } from 'react-i18next';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Chart, type BinExtended } from '../common';
import { generateTicks } from '../utils';
import { XAxisTick } from './XAxisTick';

interface TrendProps {
  data: Chart;
  tooltip: JSX.Element;
  sparkline?: boolean;
  color: string;
  strokeWidth: number;
  height?: number;
}

function Trend_({
  data,
  tooltip,
  sparkline = false,
  color,
  strokeWidth = 4,
  height,
}: TrendProps) {
  const { t, i18n } = useTranslation();

  const start = new Date(data.from).getTime();
  const end = new Date(data.to).getTime();
  const interval = (end - start) / data.data.length;

  const numberOfTicks = 5;

  const chartDataExtended: BinExtended[] = useMemo(
    () =>
      data.data.map(d => ({
        ...d,
        from: start + (d.bin - 1) * interval,
        to: start + d.bin * interval,
      })),
    [data.data, interval, start]
  );

  const xTicks = generateTicks(2, chartDataExtended.length - 1, numberOfTicks);
  const xRange = chartDataExtended.length - 1;
  const xOffset = xRange * 0.025;
  const xDomain = [1 - xOffset, chartDataExtended.length + xOffset];

  const yMax = Math.max(...chartDataExtended.map(c => c.count)) ?? 0;
  const yTicks = generateTicks(0, Math.max(yMax, 1), numberOfTicks);
  const yOffset = yMax * 0.25;
  const yDomain = [1 - yOffset, Math.max(yMax, 1) + yOffset];

  const curveFunction = curveCardinal.tension(0.5);

  const hasData = useMemo(
    () => chartDataExtended.some(d => d.count > 0),
    [chartDataExtended]
  );
  return (
    <div className="relative size-full min-h-1 min-w-1">
      <ResponsiveContainer width="100%" height={height ?? '100%'}>
        <AreaChart data={chartDataExtended ?? []}>
          <defs>
            <linearGradient
              id={`areaGradient-${color.replace('#', '')}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={color} stopOpacity={0.5} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          {!sparkline && hasData && (
            <>
              <CartesianGrid
                stroke="rgb(var(--color-background-gray))"
                strokeDasharray="2 4"
                strokeOpacity={0.5}
                horizontalFill={[]}
                verticalFill={[]}
              />

              <XAxis
                axisLine={false}
                tickLine={false}
                dataKey="bin"
                type="number"
                allowDecimals={true}
                ticks={xTicks}
                height={20}
                domain={xDomain}
                tick={props => (
                  <XAxisTick {...props} start={start} interval={interval} />
                )}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                dataKey="count"
                type="number"
                allowDecimals={true}
                domain={yDomain}
                ticks={yTicks}
                tick={{
                  fill: 'rgb(var(--color-text-secondary))',
                }}
                style={{
                  fontSize: '10px',
                }}
                width={45}
                tickFormatter={value => {
                  const formatter = new Intl.NumberFormat(i18n.language, {
                    notation: 'compact',
                    compactDisplay: 'short',
                  });
                  return formatter.format(value);
                }}
              />
              <Tooltip content={tooltip} cursor={{ fill: 'transparent' }} />
            </>
          )}

          {hasData && (
            <Area
              type={curveFunction}
              dataKey="count"
              stroke={color}
              strokeWidth={strokeWidth}
              fill={`url(#areaGradient-${color.replace('#', '')})`}
              dot={false}
              activeDot={{
                r: 6,
                stroke: 'rgb(var(--color-background-primary))',
                strokeWidth: 3,
                fill: color,
              }}
              className={!sparkline ? 'cursor-pointer' : ''}
              isAnimationActive={!sparkline}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
      {!hasData && !sparkline && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-[rgb(var(--color-text-secondary))]">
            {t('charts.notEnoughData')}
          </span>
        </div>
      )}
    </div>
  );
}

export const Trend = memo(Trend_);
