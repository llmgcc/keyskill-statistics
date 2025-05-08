import { useState } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

const renderActiveShape = (props: PieSectorDataItem) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={(outerRadius ?? 0) + 5}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{
          outline: 'none',
          border: 'none',
        }}
        stroke={'rgb(var(--color-text-secondary))'}
        cursor="pointer"
      />

      <g>
        <foreignObject
          x={(cx ?? 0) - 10}
          y={(cy ?? 0) - 15}
          width={20}
          height={20}
        >
          <div className="flex h-full w-full items-center justify-center">
            {payload.icon ? (
              <payload.icon.type
                {...payload.icon.props}
                size={20}
                className="text-xs text-text-secondary"
                style={{ color: fill }}
              />
            ) : (
              <FaQuestion
                size={20}
                className="text-xs text-text-secondary"
                style={{ color: fill }}
              />
            )}
          </div>
        </foreignObject>
      </g>
      <text
        x={(cx ?? 0) + 2}
        y={(cy ?? 0) + 10}
        dy={8}
        textAnchor="middle"
        fill={'rgb(var(--color-text-secondary))'}
        fontSize={10}
      >
        {(payload.value * 100).toFixed(2)}%
      </text>
    </g>
  );
};

export function CategoryPieChart(props: {
  data: { name: string; value: number; color: string }[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: React.MouseEvent, index: number) => {
    setActiveIndex(index);
  };

  const style = {
    outline: 'none !important',
    border: 'none',
  };

  return (
    <div className="mx-4 flex !outline-none">
      <div className="h-40 w-40">
        <ResponsiveContainer width="100%" height="100%" style={style}>
          <PieChart style={style}>
            <Pie
              isAnimationActive={false}
              activeIndex={activeIndex ?? undefined}
              activeShape={renderActiveShape}
              data={props.data}
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={() => setActiveIndex(null)}
              style={style}
              rootTabIndex={-1}
              startAngle={360}
              endAngle={0}
            >
              {props.data.map((entry) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={entry.color}
                  style={style}
                  stroke={'rgb(var(--color-text-secondary))'}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <div className="ml-4 w-fit">
          {props.data &&
            props.data.map((c, index) => (
              <div
                key={c.name}
                className={`flex cursor-pointer justify-between p-2 text-xs ${activeIndex === index ? 'opacity-100' : activeIndex !== null ? 'opacity-50' : ''}`}
                onMouseLeave={() => setActiveIndex(null)}
                onMouseEnter={(e) => onPieEnter(e, index)}
              >
                <div className="flex">
                  <div
                    className="mr-[4px] aspect-square w-4 rounded"
                    style={{ backgroundColor: c.color }}
                  ></div>
                  <div className="mr-10 text-text-primary">{c.name}</div>
                </div>
                <div className="text-text-secondary">
                  {(c.value * 100).toFixed(2)}%
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
