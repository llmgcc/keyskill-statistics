import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { XAxisTick } from './XAxisTick';

interface HistogramBin {
  bin: number;
  count: number;
}

interface HistogramBinExtended {
  bin: number;
  count: number;
  from: number;
  to: number;
}

interface HistogramChart {
  data: HistogramBin[];
  from: number;
  to: number;
}

interface HistogramProps {
  data: HistogramChart;
  tooltip: JSX.Element;
  sparkline?: boolean;
}

export interface ChartTooltip {
  active?: boolean;
  payload?: {
    payload: HistogramBinExtended;
    value: number;
  }[];
  label?: string;
}

function generateTicks(start: number, end: number, numberOfTicks: number) {
  const ticks = [];
  const interval = (end - start) / (numberOfTicks - 1);
  let currentTick = start;
  for (let i = 0; i < numberOfTicks; i++) {
    ticks.push(currentTick.toFixed(1));
    currentTick += interval;
  }
  return ticks;
}

export function Histogram({
  data,
  tooltip,
  sparkline = false,
}: HistogramProps) {
  const start = data.from;
  const end = data.to;
  const interval = (end - start) / data.data.length;

  const chartDataExtended: HistogramBinExtended[] = data.data.map((d) => ({
    ...d,
    from: start + (d.bin - 1) * interval,
    to: start + d.bin * interval,
  }));

  const histBarRadius = 3;

  const numberOfTicks = 5;

  const xTicks = generateTicks(2, chartDataExtended.length - 1, numberOfTicks);
  const xDomain = [1 - 0.5, chartDataExtended.length + 0.5];

  const yMax = Math.max(...chartDataExtended.map((c) => c.count)) ?? 0;
  const yTicks = generateTicks(0, yMax, numberOfTicks);
  const yDomain = [1, yMax];

  return (
    <div className="size-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartDataExtended ?? []}>
          {!sparkline && (
            <>
              <CartesianGrid
                stroke="rgb(var(--color-background-gray))"
                strokeDasharray="1 1"
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
                domain={xDomain}
                ticks={xTicks}
                height={10}
                tick={(props) => (
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
                  fontSize: '8px',
                }}
                width={25}
              />

              <Tooltip content={tooltip} cursor={{ fill: 'transparent' }} />
            </>
          )}

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
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
