import { useEffect, useRef, useState } from 'react';

import './Plot.css';

import { API } from '@/api/api';
import { Skeleton } from '@radix-ui/themes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Experience } from '@/config/experience';

import { svgCurveFromPoints } from './svg-curve';

function SVGPlot(props: {
  data: number[];
  width: number;
  height: number;
  color: string;
  strokeWidth?: number;
}) {
  const [closestPointIndex, setClosestPointIndex] = useState<number | null>(
    null,
  );

  function mapRange(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
  ) {
    return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
  }

  const strokeWidth = props.strokeWidth ?? 0;

  const data = props.data;
  const width = props.width;
  const height = props.height;
  const color = props.color;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const points: number[][] = [];
  const XOFFSET = 10;
  const YOFFSET = 10;

  for (let i = 0; i < data.length; i++) {
    const x = mapRange(i, 0, data.length - 1, XOFFSET, width - XOFFSET);
    const y = height - mapRange(data[i], min, max, YOFFSET, height - YOFFSET);
    points.push([x, y]);
  }

  function selectedPoint() {
    return closestPointIndex === null ? null : (
      <>
        {/* <line x1={points[closestPointIndex][0]} y1={0} x2={points[closestPointIndex][0]} y2={height} strokeWidth="1" strokeDasharray="1" stroke={color} /> */}
        <circle
          cx={points[closestPointIndex][0]}
          cy={points[closestPointIndex][1]}
          r="2.5"
          stroke={color}
          strokeWidth="2"
          fill="white"
        />
      </>
    );
  }

  const [curve, connection] = svgCurveFromPoints(points, width, height);

  return (
    <div style={{ height: 'inherit' }}>
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none slice"
        onMouseLeave={() => setClosestPointIndex(null)}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
        </defs>
        <path d={curve} stroke={color} fill="none" strokeWidth={strokeWidth} />
        <path d={curve + connection} fill={color} fillOpacity="0.1" />
        {selectedPoint()}
      </svg>
    </div>
  );
}

function Plot(props: { data: number[]; color: string; strokeWidth?: number }) {
  const svgWrapper = useRef<HTMLDivElement>(null);
  const data = props.data;

  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const color = props.color;

  useEffect(() => {
    if (!svgWrapper.current) return;
    const resizeObserver = new ResizeObserver(() => {
      if (svgWrapper.current) {
        setSize({
          width: svgWrapper.current.clientWidth,
          height: svgWrapper.current.clientHeight,
        });
      }
    });
    resizeObserver.observe(svgWrapper.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="plot" ref={svgWrapper}>
      {SVGPlot({
        data,
        width: size.width,
        height: size.height,
        color,
        strokeWidth: props.strokeWidth,
      })}
    </div>
  );
}

type SkillPlotProps = {
  name: string;
  period: number;
  color: string;
  strokeWidth: number;
  experience: Experience;
};

export function SkillPlot({
  name,
  period,
  color,
  strokeWidth,
  experience,
}: SkillPlotProps) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [`${name}_plot`, period, experience],
    queryFn: async () => {
      const data = await API.skillPlot(
        name,
        period,
        experience == Experience.any ? undefined : (experience ?? undefined),
      );
      return data ?? [];
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const chartData = [];
  console.log('DATA', data);
  if (data) {
    const COUNT_BINS = 15;
    for (let i = 1; i <= (COUNT_BINS ?? 1); i++) {
      const index = data.findIndex((p) => p.bin == i);
      if (index !== -1) {
        chartData.push(data[index].count);
      } else {
        chartData.push(0);
      }
    }
  }

  return (
    <div className="size-full">
      <Skeleton loading={isLoading || isFetching} className="size-full">
        {chartData.length && (
          <Plot data={chartData} color={color} strokeWidth={2} />
        )}
      </Skeleton>
    </div>
  );
}

export default Plot;
