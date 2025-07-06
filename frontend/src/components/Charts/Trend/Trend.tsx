import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import colors from 'tailwindcss/colors';

import { Chart, type BinExtended } from '../common';
import { generateTicks } from '../utils';
import { XAxisTick } from './XAxisTick';

interface TrendProps {
  data: Chart;
  tooltip: JSX.Element;
  sparkline?: boolean;
  color: string;
}

export function Trend({
  data,
  tooltip,
  sparkline = false,
  color = colors.gray[400],
}: TrendProps) {
  const start = new Date(data.from).getTime();
  const end = new Date(data.to).getTime();
  const interval = (end - start) / data.data.length;

  const numberOfTicks = 5;

  const chartDataExtended: BinExtended[] = data.data.map((d) => ({
    ...d,
    from: start + (d.bin - 1) * interval,
    to: start + d.bin * interval,
  }));

  const xTicks = generateTicks(2, chartDataExtended.length - 1, numberOfTicks);
  const xDomain = [1, chartDataExtended.length];

  const yMax = Math.max(...chartDataExtended.map((c) => c.count)) ?? 0;
  const yTicks = generateTicks(0, yMax, numberOfTicks);
  const yDomain = [1, yMax];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartDataExtended ?? []}>
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
              ticks={xTicks}
              height={20}
              domain={xDomain}
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

        <Line
          type="monotone"
          dot={false}
          strokeWidth={4}
          dataKey="count"
          stroke={`${color}`}
          className={!sparkline ? 'cursor-pointer' : ''}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
