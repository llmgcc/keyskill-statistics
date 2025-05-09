import { API } from '@/api/api';
import { KeySkill } from '@/interfaces';
import { BsStars } from 'react-icons/bs';
import { FaFire, FaQuestion } from 'react-icons/fa';
import { FaArrowTrendDown } from 'react-icons/fa6';
import { MdArrowRightAlt } from 'react-icons/md';

import { Highlights as HighlightsEnum } from '@/config/highlights';

import { SalaryRenderer } from '../table/renderers/SalaryRenderer';
import { ValueChangeRenderer } from '../table/renderers/ValueChangeRenderer';
import { HighlightsCard, HiglightBase } from './HighlightsCard';

export function Highlights() {
  const skillValueRenderer = (skill: KeySkill) => {
    return (
      <div className="flex flex-col items-end">
        <div className="flex items-center text-xs font-[400] text-text-primary">
          {skill.prev_count} <MdArrowRightAlt className="mx-1" size={15} />{' '}
          {skill.count}
        </div>
        <div className="text-xs">
          {!!skill.prev_count && (
            <ValueChangeRenderer
              current={skill.count}
              prev={skill.prev_count}
              percent={true}
            />
          )}
        </div>
      </div>
    );
  };

  const highlights: Record<string, HiglightBase> = {
    [HighlightsEnum['Fastest-Growing Skills']]: {
      icon: <FaFire className="text-background-accent" />,
      source: API.highlightsGainers,
      valueRenderer: skillValueRenderer,
    },
    [HighlightsEnum['Skills Losing Demand']]: {
      icon: <FaArrowTrendDown className="text-background-accent" />,
      source: API.highlightsDecliners,
      valueRenderer: skillValueRenderer,
    },
    [HighlightsEnum['Newly Emerging Skills']]: {
      icon: <BsStars className="text-background-accent" />,
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
        <div className="w-28">
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
      </div>
    );
  };

  const highlightsSalary: Record<string, HiglightBase> = {
    [HighlightsEnum['Highest-Paying Skills']]: {
      icon: <FaFire className="text-background-accent" />,
      source: API.highlightsHighestSalary,
      valueRenderer: salaryRenderer,
    },
    [HighlightsEnum['Lowest-Paying Skills']]: {
      icon: <FaArrowTrendDown className="text-background-accent" />,
      source: API.highlightsLowestSalary,
      valueRenderer: salaryRenderer,
    },
    [HighlightsEnum['Skills with Undisclosed Salaries']]: {
      icon: <FaQuestion className="text-background-accent" size={10} />,
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
