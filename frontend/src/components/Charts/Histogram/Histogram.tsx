import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { BinExtended, Chart } from '../common';
import { generateTicks } from '../utils';
import { XAxisTick } from './XAxisTick';

interface HistogramProps {
  data: Chart;
  tooltip: JSX.Element;
  sparkline?: boolean;
  height?: number;
}

function Histogram_({
  data,
  tooltip,
  sparkline = false,
  height,
}: HistogramProps) {
  const { t, i18n } = useTranslation();
  const start = data.from;
  const end = data.to;
  const interval = (end - start) / data.data.length;

  const chartDataExtended: BinExtended[] = data.data.map(d => ({
    ...d,
    from: start + (d.bin - 1) * interval,
    to: start + d.bin * interval,
  }));

  const histBarRadius = 3;

  const numberOfTicks = 5;

  const xTicks = generateTicks(2, chartDataExtended.length - 1, numberOfTicks);
  const xDomain = [1 - 0.5, chartDataExtended.length + 0.5];

  const yMax = Math.max(...chartDataExtended.map(c => c.count)) ?? 0;
  const yTicks = generateTicks(0, Math.max(yMax, 1), numberOfTicks);
  const yDomain = [1, Math.max(yMax, 1)];

  const hasData = chartDataExtended.some(d => d.count > 0);

  return (
    <div className="relative size-full">
      <ResponsiveContainer width="100%" height={height ?? '100%'}>
        <BarChart data={chartDataExtended ?? []}>
          {!sparkline && hasData && (
            <>
              <CartesianGrid
                stroke="rgb(var(--color-background-gray))"
                strokeDasharray="2 4"
                strokeOpacity={0.5}
                horizontalFill={[]}
                verticalFill={[]}
              />
              <Tooltip content={tooltip} cursor={{ fill: 'transparent' }} />
            </>
          )}

          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey="bin"
            type="number"
            allowDecimals={true}
            domain={xDomain}
            ticks={xTicks}
            height={20}
            tick={props => (
              <XAxisTick {...props} start={start} interval={interval} />
            )}
            hide={sparkline || !hasData}
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
            tickFormatter={value => {
              const formatter = new Intl.NumberFormat(i18n.language, {
                notation: 'compact',
                compactDisplay: 'short',
              });
              return formatter.format(value);
            }}
            width={45}
            hide={sparkline || !hasData}
          />

          {hasData && (
            <Bar
              className={!sparkline ? 'cursor-pointer' : ''}
              dataKey="count"
              fill="rgb(var(--color-background-gray))"
              radius={[
                histBarRadius,
                histBarRadius,
                histBarRadius,
                histBarRadius,
              ]}
              activeBar={{
                fill: 'rgb(var(--color-background-accent))',
                opacity: 0.7,
              }}
              barSize={100}
              isAnimationActive={!sparkline}
            />
          )}
        </BarChart>
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

export const Histogram = memo(Histogram_);
