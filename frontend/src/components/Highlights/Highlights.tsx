import { API } from '@/api/api';
import { placeholderData } from '@/utils/common';
import { useState } from 'react';
import { Button, SegmentGroup } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { BsStars } from 'react-icons/bs';
import { FaFire, FaQuestion } from 'react-icons/fa';
import { FaArrowTrendDown } from 'react-icons/fa6';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { KeySkill } from '@/interfaces';
import {
  HighlightIcons,
  Highlights as HighlightsConfig,
  Highlights as HighlightsEnum,
} from '@/config/highlights';
import { useHighlights } from '@/hooks/data/useHighlights';
import {
  HighlightsCard,
  HiglightBase,
} from '@/components/Highlights/HighlightsCard';

import {
  HighlightCardBody,
  HighlightSeeMore,
} from '../Pages/Highlights/HighlightsPage';
import { ValueChangeRenderer } from '../Table/renderers/ValueChangeRenderer';
import { CurrencyDisplay } from '../ui/CurrencyDisplay';
import { Overlay } from '../ui/Overlay';
import { SkillSalaryRenderer } from './SkillSalaryRenderer';
import { SkillValueRenderer } from './SkillValueRenderer';

export interface HighlightsTabsProps {
  tabs: {
    value: HighlightsConfig;
    label: JSX.Element;
    displayValue: JSX.Element;
    displayChange: JSX.Element;
  }[];
}

function HighlightsTabs({ tabs }: HighlightsTabsProps) {
  const { t } = useTranslation();

  const [tabValue, setTabValues] = useState<string | null>(tabs[0].value);
  const { highlights, isLoading, isFetching } = useHighlights(tabValue);

  const currentTab = tabs.find(t => t.value === tabValue);

  return (
    <Overlay isFetching={isFetching} isLoading={isLoading}>
      <div className="h-full w-full overflow-hidden rounded border-[1px] border-background-secondary shadow-sm">
        <div className="bg-background flex w-full items-center justify-between border-b-[1px] border-background-secondary p-2 py-1">
          <div className="flex flex-[2] items-center gap-2 truncate text-sm font-medium">
            <div className="flex items-center gap-2">
              {tabValue && HighlightIcons[tabValue as HighlightsConfig]}
              <span>{t(`highlights.${tabValue}`)}</span>
            </div>
            <div>
              <HighlightSeeMore
                type={tabValue as HighlightsConfig}
                short={true}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <SegmentGroup.Root
                size={'xs'}
                value={tabValue}
                onValueChange={details => setTabValues(details.value)}
                className="bg-background-secondary"
              >
                <SegmentGroup.Indicator className="bg-background-primary" />
                <SegmentGroup.Items items={tabs} />
              </SegmentGroup.Root>
            </div>
          </div>
        </div>
        <HighlightCardBody
          maxToDisplay={6}
          value={currentTab?.displayValue}
          change={currentTab?.displayChange}
          highlights={highlights ?? placeholderData(10)}
          isLoading={isLoading}
        />
      </div>
    </Overlay>
  );
}

export function Highlights() {
  const count = (skill: KeySkill) => <div>{skill.count ?? 0}</div>;
  const countChange = (skill: KeySkill) => (
    <ValueChangeRenderer
      current={skill.count ?? 0}
      prev={skill.prev_count}
      percent={true}
    />
  );
  const salary = (skill: KeySkill) => (
    <CurrencyDisplay valueInRUB={skill.average_salary ?? 0} />
  );
  const salaryChange = (skill: KeySkill) => (
    <ValueChangeRenderer
      current={skill.average_salary ?? 0}
      prev={skill.prev_average_salary}
      percent={true}
    />
  );

  const countTabs = [
    HighlightsConfig.gainers,
    HighlightsConfig.decliners,
    HighlightsConfig.new,
  ].map(h => ({
    value: h,
    label: HighlightIcons[h],
    displayValue: count,
    displayChange: countChange,
  }));

  const salaryTabs = [
    {
      value: HighlightsConfig['highest-salary'],
      label: HighlightIcons[HighlightsConfig['highest-salary']],
      displayValue: salary,
      displayChange: salaryChange,
    },
    {
      value: HighlightsConfig['lowest-salary'],
      label: HighlightIcons[HighlightsConfig['lowest-salary']],
      displayValue: salary,
      displayChange: salaryChange,
    },
    {
      value: HighlightsConfig['unknown-salary'],
      label: HighlightIcons[HighlightsConfig['unknown-salary']],
      displayValue: count,
      displayChange: countChange,
    },
  ];

  return (
    <div className="app-container relative z-0 mt-1 flex-col items-center justify-center">
      <div className="flex w-full flex-col gap-2 lg:flex-row">
        <div className="w-full">
          <HighlightsTabs tabs={countTabs} />
        </div>
        <div className="w-full">
          <HighlightsTabs tabs={salaryTabs} />
        </div>
      </div>
    </div>
  );
}

// export function Highlights() {
//   const highlights: Record<string, HiglightBase> = {
//     [HighlightsEnum['Fastest-Growing Skills']]: {
//       icon: <FaFire className="text-background-accent" />,
//       source: API.highlightsGainers,
//       valueRenderer: skill => <SkillValueRenderer skill={skill} />,
//     },
//     [HighlightsEnum['Skills Losing Demand']]: {
//       icon: <FaArrowTrendDown className="text-background-accent" />,
//       source: API.highlightsDecliners,
//       valueRenderer: skill => <SkillValueRenderer skill={skill} />,
//     },
//     [HighlightsEnum['Newly Emerging Skills']]: {
//       icon: <BsStars className="text-background-accent" />,
//       source: API.highlightsNewSkills,
//       valueRenderer: skill => <SkillValueRenderer skill={skill} />,
//     },
//   };

//   const highlightsSalary: Record<string, HiglightBase> = {
//     [HighlightsEnum['Highest-Paying Skills']]: {
//       icon: <FaFire className="text-background-accent" />,
//       source: API.highlightsHighestSalary,
//       valueRenderer: skill => <SkillSalaryRenderer skill={skill} />,
//     },
//     [HighlightsEnum['Lowest-Paying Skills']]: {
//       icon: <FaArrowTrendDown className="text-background-accent" />,
//       source: API.highlightsLowestSalary,
//       valueRenderer: skill => <SkillSalaryRenderer skill={skill} />,
//     },
//     [HighlightsEnum['Skills with Undisclosed Salaries']]: {
//       icon: <FaQuestion className="text-background-accent" size={10} />,
//       source: API.highlightsUndefinedSalary,
//       valueRenderer: skill => <SkillSalaryRenderer skill={skill} />,
//     },
//   };

//   return (
//     <div className="app-container relative z-0 mt-1 flex-col items-center justify-center">
//       <div className="flex w-full flex-col lg:flex-row">
//         <div className="w-full p-1">
//           <HighlightsCard highlights={highlights} />
//         </div>
//         <div className="w-full p-1">
//           <HighlightsCard highlights={highlightsSalary} />
//         </div>
//       </div>
//     </div>
//   );
// }
