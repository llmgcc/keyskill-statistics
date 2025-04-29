import { cloneElement, useState } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';

const renderActiveShape = (props: any) => {
  // const RADIAN = Math.PI / 180;

  // const a = 10;
  // const b = 30;

  const {
    cx,
    cy,
    // midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;
  // const sin = Math.sin(-RADIAN * midAngle);
  // const cos = Math.cos(-RADIAN * midAngle);
  // const sx = cx + (outerRadius + a) * cos;
  // const sy = cy + (outerRadius + a) * sin;
  // const mx = cx + (outerRadius + b) * cos;
  // const my = cy + (outerRadius + b) * sin;
  // const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  // const ey = my;
  // const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 5}
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
          x={cx - 10} // Adjust these values based on your icon size
          y={cy - 15}
          width={20}
          height={20}
        >
          <div className="flex h-full w-full items-center justify-center">
            {/* <FaChartPie size={20} className="text-text-secondary text-xs" style={{color: fill}}/> */}
            {/* {payload.icon} */}
            {cloneElement(payload.icon ?? <FaQuestion />, {
              size: 20,
              className: 'text-text-secondary text-xs',
              style: { color: fill },
            })}
          </div>
        </foreignObject>
      </g>
      <text
        x={cx + 2}
        y={cy + 10}
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
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_: any, index: any) => {
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
              {props.data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
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
                onMouseEnter={() => onPieEnter(null, index)}
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
