import { useState } from 'react';
import { API } from '@/api/api';
import { KeySkill } from '@/interfaces';
import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { SegmentedControl, Skeleton } from '@radix-ui/themes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { CiLock } from 'react-icons/ci';
import { FaFire } from 'react-icons/fa';
import { FaArrowTrendDown } from 'react-icons/fa6';

import { Experience } from '@/config/experience';
import { Highlights as HighlightsEnum } from '@/config/highlights';

import SkillDescription from './SkillDescription';
import StatCard from './StatCard';
import { CurrencyDisplay } from './CurrencyDisplay';
import { MdArrowRight, MdArrowRightAlt, MdOutlineArrowDropUp } from 'react-icons/md';
import { SalaryRenderer } from '../table/renderers/SalaryRenderer';

function getPercentDifference(current: number, prev: number) {
  return ((current - prev) / prev) * 100;
}

function change(count: number, prev_count?: number, percent = true) {
  if (!prev_count) {
    return null;
  }
  let value = count;
  if (percent) {
    value = getPercentDifference(count, prev_count);
  }

  const className = value >= 0 ? 'text-green-400' : 'text-red-400';

  const valueString = percent ? `${value.toFixed(1)}%` : value;

  return (
    <div className={`flex items-center ${className} text-xs`}>
      <div className="highlight-card-data-change-value-icon">
        {
          // value >= 0 ? <MdOutlineArrowDropUp size={15} /> : <MdOutlineArrowDropDown size={15} />
        }
      </div>
      <div>{valueString}</div>
    </div>
  );
}

type HiglightBase = {
  icon: JSX.Element;
  source: () => Promise<KeySkill[]>;
  valueRenderer: (skill: KeySkill) => JSX.Element | null;
};

type HighlightsCardProps = {
  highlights: Record<string, HiglightBase>;
};

type HighlightsCardTabProps = {
  title: string;
  source: (experience?: Experience, period?: number) => Promise<KeySkill[]>;
  valueRenderer: (skill: KeySkill) => JSX.Element | null;
};

function HighlightsCardTab({
  title,
  source,
  valueRenderer,
}: HighlightsCardTabProps) {
  const { selectedExperience } = useExperienceStore();
  const { selectedPeriod } = usePeriodStore();

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [title, selectedExperience, selectedPeriod],
    queryFn: async () => {
      const data = await source(
        selectedExperience == Experience.any
          ? undefined
          : (selectedExperience ?? undefined),
        selectedPeriod ?? undefined,
      );
      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const defaultItem = {
    name: '-'.repeat(50),
    count: 100,
    prev_count: 50,
    categories: [],
    technologies: [],
    place: 20,
    prev_place: 10,
  };

  const defaultData = Array(5).fill(defaultItem);

  return (
    <div>
      {(data ?? defaultData).map((h: KeySkill, index) => {
        return (
          <div className="flex items-center justify-between p-2" key={index}>
            <div className="">
              <Skeleton loading={isLoading || isFetching}>
                <div>
                  <SkillDescription {...h} />
                </div>
              </Skeleton>
            </div>
            <Skeleton loading={isLoading || isFetching}>
              <div>{valueRenderer(h)}</div>
            </Skeleton>
          </div>
        );
      })}
    </div>
  );
}

function HighlightsCard({ highlights }: HighlightsCardProps) {
  const [currentTab, setCurrentTab] = useState<string>(
    Object.keys(highlights)?.[0],
  );
  const { t } = useTranslation();

  return (
    <StatCard header={t(`highlights.${currentTab}`)}>
      <StatCard.Settings>
        <div className="">
          <div className="flex">
            <SegmentedControl.Root
              defaultValue={currentTab}
              size={'1'}
              variant="classic"
              onValueChange={(v) => setCurrentTab(v)}
            >
              {Object.keys(highlights).map((k) => (
                <SegmentedControl.Item
                  value={k}
                  className="cursor-pointer"
                  key={k}
                >
                  {highlights[k].icon}
                </SegmentedControl.Item>
              ))}
            </SegmentedControl.Root>
          </div>
        </div>
      </StatCard.Settings>
      <StatCard.Body>
        {currentTab && (
          <HighlightsCardTab
            title={currentTab}
            source={highlights[currentTab].source}
            valueRenderer={highlights[currentTab].valueRenderer}
          />
        )}
      </StatCard.Body>
    </StatCard>
  );
}

export function Highlights() {
  const trendings: KeySkill[] = [
    {
      name: 'Python',
      count: 100,
      prev_count: 50,
      categories: [],
      technologies: [],
      place: 0,
      prev_place: 0,
    },
  ];


  const skillValueRenderer = (skill: KeySkill) => {
    return <div className='flex flex-col items-end'>
      <div className='text-xs text-text-primary font-[400] flex items-center'>{skill.prev_count} <MdArrowRightAlt className="mx-1" size={15} /> {skill.count}</div>
      <div>{change(skill.count, skill.prev_count, true)}</div>
    </div>
  }

  const highlights: Record<string, HiglightBase> = {
    [HighlightsEnum['Fastest-Growing Skills']]: {
      icon: <FaFire />,
      source: API.highlightsGainers,
      valueRenderer: skillValueRenderer,
    },
    [HighlightsEnum['Skills Losing Demand']]: {
      icon: <FaArrowTrendDown />,
      source: API.highlightsDecliners,
      valueRenderer: skillValueRenderer,
    },
    [HighlightsEnum['Newly Emerging Skills']]: {
      icon: <CiLock />,
      source: API.highlightsNewSkills,
      valueRenderer: skillValueRenderer,
    },
  };

  const salaryRenderer = (skill: KeySkill) => {
    if (!skill.average_salary) {
      return null;
    }
    return (
      <div className="text-xs text-text-primary">
              <div className='w-28'>
                <SalaryRenderer
                  maxCount={10 ** 6}
                  isLoading={false}
                  selectedPeriod={7}
                  selectedExperience={undefined}
                  name={skill.name}
                  key={'skills_salary'}
                  count={skill.average_salary ?? 0}
                  source={API.salaryPlot}
                />
              </div>
        {/* <CurrencyDisplay valueInRUB={skill.average_salary} /> */}
      </div>
    );
  };

  const highlightsSalary: Record<string, HiglightBase> = {
    [HighlightsEnum['Highest-Paying Skills']]: {
      icon: <FaFire />,
      source: API.highlightsHighestSalary,
      valueRenderer: salaryRenderer,
    },
    [HighlightsEnum['Lowest-Paying Skills']]: {
      icon: <FaArrowTrendDown />,
      source: API.highlightsLowestSalary,
      valueRenderer: salaryRenderer,
    },
    [HighlightsEnum['Skills with Undisclosed Salaries']]: {
      icon: <CiLock />,
      source: API.highlightsUndefinedSalary,
      valueRenderer: salaryRenderer,
    },
  };

  return (
    <div className="app-container relative z-0 mt-1 flex-col items-center justify-center">
      <div className="flex w-full flex-col lg:flex-row">
        <div className="w-full p-1">
          <HighlightsCard highlights={highlights} />
        </div>
        <div className="w-full p-1">
          <HighlightsCard highlights={highlightsSalary} />
        </div>
      </div>
    </div>
  );
}
