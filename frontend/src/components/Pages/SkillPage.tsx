import { API } from '@/api/api';
import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { BsArrowUp } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import colors from 'tailwindcss/colors';

import { Experience } from '@/config/experience';
import { useFilters } from '@/hooks/useFilters';

import { Filter } from '../Filter/Filter';
import { SkillImage } from '../ui/SkillImage';
import { SalaryDistribution } from './SalaryDistribution';

interface HistProps {
  name: string;
}

interface PlotProps {
  name: string;
}

function Plot({ name }: HistProps) {
  const selectedPeriod = usePeriodStore((state) => state.selectedPeriod);
  const selectedExperience = useExperienceStore(
    (state) => state.selectedExperience,
  );

  const plotKey = 'skills_plot';

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`${name}_hist_${plotKey}`, selectedPeriod, selectedExperience],
    queryFn: async () => {
      const data = await API.skillPlot(
        name,
        selectedPeriod,
        selectedExperience == Experience.any
          ? undefined
          : (selectedExperience ?? undefined),
      );
      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const min = Math.min(...(data ?? []).map((d) => d.count)) ?? 0;
  const max = Math.max(...(data ?? []).map((d) => d.count)) ?? 1;

  const chartData = [];
  if (data?.length) {
    const COUNT_BINS = 25;
    for (let i = 1; i <= (COUNT_BINS ?? 1); i++) {
      const index = data.findIndex((p) => p.bin == i);
      if (index !== -1) {
        chartData.push({
          bin: i,
          count: data[index].count / max + 0.1,
        });
      } else {
        chartData.push({
          bin: i,
          count: 0.1,
        });
      }
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded border border-gray-200 bg-background-primary p-2 shadow-lg">
          <p className="text-sm">Count: {payload[0].value}</p>
          <p className="text-sm">Bin: {label}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData ?? []}>
        <CartesianGrid
          stroke="rgb(var(--color-background-gray))"
          vertical={true}
          horizontal={false}
          strokeWidth={1}
        />
        {/* <XAxis dataKey="bin" /> */}
        {/* <YAxis /> */}
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
        {/* <Legend /> */}
        <Line
          type="monotone"
          dot={false}
          className="cursor-pointer"
          strokeWidth={4}
          dataKey="count"
          stroke={`${colors.green[400]}`}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function Complexity() {
  return (
    <div className="mt-2 w-[35%] resize rounded border-[1px] border-background-secondary p-3 shadow-sm shadow-background-secondary">
      <div className="text-base font-[500]">Skill complexity</div>
      <div className="mt-1 flex items-center justify-between text-xs">
        <div className="text-3xl font-bold">Junior level</div>
        <div className="flex flex-col items-end">
          <div className="mx-1 flex items-center text-xs text-green-400">
            75%
          </div>
          <div className="relative h-[4px] w-24 rounded bg-background-secondary">
            <div className="absolute left-0 top-0 z-20 h-full w-[75%] rounded bg-background-gray text-xs text-text-secondary"></div>
          </div>
        </div>
      </div>

      <div className="mb-2 text-xs text-text-secondary">
        Навык чаще встречается у опытных специалистов
        {/* Skill is more common among experienced specialists */}
      </div>

      <div className="mb-4 mt-3 rounded bg-background-secondary p-2 text-xs">
        <div className="text-xs text-text-secondary">
          Complexity is calculated based on the frequency of occurrence of the
          skill among specialists of different levels
        </div>
        <div className="mb-1 font-medium">Как рассчитывается сложность:</div>
        <div>
          (Без опыта × 0 + 1-3 года × 0.3 + 3-6 лет × 0.6 + Более 6 лет × 1.0)
        </div>
        <div className="mt-1">Сумма / Общее количество</div>
      </div>

      <div className="mt-4">
        <div className="text-base">Distribution</div>
        <div className="flex h-5 w-full gap-1">
          <div className="h-full w-[5%] rounded bg-gray-400"></div>
          <div className="h-full w-[20%] rounded bg-yellow-400"></div>
          <div className="h-full w-[25%] rounded bg-red-400"></div>
          <div className="h-full w-[15%] rounded bg-cyan-400"></div>
          <div className="h-full w-[35%] rounded bg-pink-400"></div>
        </div>

        <div className="mt-2">
          <div className="my-1 flex h-5 items-center justify-between">
            <div className="flex h-full items-center gap-1">
              <div className="h-full w-2 rounded bg-gray-400"></div>
              <div className="text-sm text-text-secondary">Unknown - 5%</div>
            </div>
            <div className="text-sm text-text-primary">225</div>
          </div>
          <div className="my-2 flex h-5 items-center justify-between">
            <div className="flex h-full items-center gap-1">
              <div className="h-full w-2 rounded bg-yellow-400"></div>
              <div className="text-sm text-text-secondary">
                No experience - 20%
              </div>
            </div>
            <div className="text-sm text-text-primary">225</div>
          </div>
          <div className="my-2 flex h-5 items-center justify-between">
            <div className="flex h-full items-center gap-1">
              <div className="h-full w-2 rounded bg-red-400"></div>
              <div className="text-sm text-text-secondary">1-3 years - 35%</div>
            </div>
            <div className="text-sm text-text-primary">225</div>
          </div>
          <div className="my-2 flex h-5 items-center justify-between">
            <div className="flex h-full items-center gap-1">
              <div className="h-full w-2 rounded bg-cyan-400"></div>
              <div className="text-sm text-text-secondary">3-6 years - 35%</div>
            </div>
            <div className="text-sm text-text-primary">225</div>
          </div>
          <div className="my-2 flex h-5 items-center justify-between">
            <div className="flex h-full items-center gap-1">
              <div className="h-full w-2 rounded bg-pink-400"></div>
              <div className="text-sm text-text-secondary">
                More than 6 years - 35%
              </div>
            </div>
            <div className="text-sm text-text-primary">225</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Predictions() {
  const data = [
    {
      count: 5,
      actual: 3,
      label: 'Backend development',
    },
    {
      count: 5,
      actual: 3,
      label: 'Frontend development',
    },
    {
      count: 5,
      actual: 2,
      label: 'DevOps & Infrastructure',
    },
    {
      count: 5,
      actual: 1,
      label: 'Design',
    },
  ];
  return (
    <div className="w-[100%] resize rounded border-[1px] border-background-secondary p-3 shadow-sm shadow-background-secondary">
      <div className="text-base font-[500]">Domains</div>
      <div className="mt-1 flex items-center justify-between text-xs">
        <div className="text-3xl font-bold">Backend development</div>
        <div className="flex flex-col items-end">
          <div className="mx-1 flex items-center text-xs text-green-400">
            <BsArrowUp size={10} />
            23%
          </div>
          <div className="mx-1 text-xs text-text-secondary">+44.214 USD</div>
        </div>
      </div>

      <div className="text-xs text-text-secondary">
        ML classifier prediction
      </div>
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data} barCategoryGap={2} barGap={0}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey={'label'} width={190} />
            <Bar
              dataKey="actual"
              fill="rgb(var(--color-background-accent))"
              radius={[5, 5, 5, 5]}
              stackId="stack" // Added stackId for stacking
              activeBar={{
                fill: 'rgb(var(--color-background-accent))',
                opacity: 0.7,
              }}
            />
            <Bar
              dataKey="count"
              fill="rgb(var(--color-background-secondary))"
              // radius={[5, 5, 5, 5]}
              stackId="stack" // Added stackId for stacking
              activeBar={{
                fill: 'rgb(var(--color-background-secondary))',
                opacity: 0.7,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function SkillPage() {
  const { name } = useParams<{ name: string }>();
  const selectedPeriod = usePeriodStore((state) => state.selectedPeriod);
  const selectedExperience = useExperienceStore(
    (state) => state.selectedExperience,
  );

  const { period, experience } = useFilters();

  const {
    data: skill,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [name, period, experience],
    queryFn: async () => {
      const data = await API.skill(
        name,
        selectedPeriod,
        selectedExperience == Experience.any
          ? undefined
          : (selectedExperience ?? undefined),
      );
      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  return (
    <div className="app-container">
      {/* <div className='h-52 w-[400px]'>
                <Histogram />
            </div> */}

      <div className="rounded bg-background-primary py-2">
        {skill?.name && (
          <div className="flex items-center rounded border-[1px] border-background-secondary p-2 py-4 shadow shadow-background-secondary">
            <div className="h-10 w-10">
              <SkillImage domain={skill.domains[0]?.name} path={skill?.image} />
            </div>
            <h1 className="p-2 text-base font-bold">{skill?.name}</h1>
          </div>
        )}

        <div className="my-2">
          <Filter />
        </div>

        <div className="flex gap-2">
          <div className="w-[75%] resize rounded border-[1px] border-background-secondary p-3 shadow-sm shadow-background-secondary">
            <div className="text-base font-[500]">Demand trend</div>
            <div className="mt-1 flex items-center justify-between text-xs">
              <div className="text-3xl font-bold">1425</div>
              <div className="flex flex-col items-end">
                <div className="mx-1 flex items-center text-xs text-green-400">
                  <BsArrowUp size={10} />
                  23%
                </div>
                <div className="mx-1 text-xs text-text-secondary">
                  +44 mentions compared to another period
                </div>
              </div>
            </div>
            <div className="text-xs text-text-secondary">
              Mentions for last <span className="font-bold">60 days</span>
            </div>

            <div className="h-52 w-full">
              {skill?.name && <Plot name={skill.name} />}
            </div>
          </div>

          <div className="w-[25%]">
            {skill?.name && (
              <SalaryDistribution
                name={skill.name}
                medianSalary={skill.average_salary}
                prevMedianSalary={skill.prev_average_salary}
              />
            )}
          </div>
        </div>

        <Predictions />

        <Complexity />
      </div>
    </div>
  );
}
