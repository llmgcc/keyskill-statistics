import { API } from '@/api/api';
import { BsStars } from 'react-icons/bs';
import { FaFire, FaQuestion } from 'react-icons/fa';
import { FaArrowTrendDown } from 'react-icons/fa6';

import { Highlights as HighlightsEnum } from '@/config/highlights';
import {
  HighlightsCard,
  HiglightBase,
} from '@/components/Highlights/HighlightsCard';

import { SkillSalaryRenderer } from './SkillSalaryRenderer';
import { SkillValueRenderer } from './SkillValueRenderer';

export function Highlights() {
  const highlights: Record<string, HiglightBase> = {
    [HighlightsEnum['Fastest-Growing Skills']]: {
      icon: <FaFire className="text-background-accent" />,
      source: API.highlightsGainers,
      valueRenderer: (skill) => <SkillValueRenderer skill={skill} />,
    },
    [HighlightsEnum['Skills Losing Demand']]: {
      icon: <FaArrowTrendDown className="text-background-accent" />,
      source: API.highlightsDecliners,
      valueRenderer: (skill) => <SkillValueRenderer skill={skill} />,
    },
    [HighlightsEnum['Newly Emerging Skills']]: {
      icon: <BsStars className="text-background-accent" />,
      source: API.highlightsNewSkills,
      valueRenderer: (skill) => <SkillValueRenderer skill={skill} />,
    },
  };

  const highlightsSalary: Record<string, HiglightBase> = {
    [HighlightsEnum['Highest-Paying Skills']]: {
      icon: <FaFire className="text-background-accent" />,
      source: API.highlightsHighestSalary,
      valueRenderer: (skill) => <SkillSalaryRenderer skill={skill} />,
    },
    [HighlightsEnum['Lowest-Paying Skills']]: {
      icon: <FaArrowTrendDown className="text-background-accent" />,
      source: API.highlightsLowestSalary,
      valueRenderer: (skill) => <SkillSalaryRenderer skill={skill} />,
    },
    [HighlightsEnum['Skills with Undisclosed Salaries']]: {
      icon: <FaQuestion className="text-background-accent" size={10} />,
      source: API.highlightsUndefinedSalary,
      valueRenderer: (skill) => <SkillSalaryRenderer skill={skill} />,
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
