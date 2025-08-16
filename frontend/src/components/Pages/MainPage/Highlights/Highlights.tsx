import { KeySkill } from '@/interfaces';
import {
  HighlightIcons,
  Highlights as HighlightsConfig,
} from '@/config/highlights';
import { CurrencyDisplay } from '@/components/ui/CurrencyDisplay';
import { ValueChangeRenderer } from '@/components/Table/renderers/ValueChangeRenderer';

import { HighlightsTabs, HighlightTab } from './HighlightsTabs';

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

  const countTabs: HighlightTab[] = [
    HighlightsConfig.gainers,
    HighlightsConfig.decliners,
    HighlightsConfig.new,
  ].map(h => ({
    value: h,
    label: HighlightIcons[h],
    displayValue: count,
    displayChange: countChange,
  }));

  const salaryTabs: HighlightTab[] = [
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
      value: HighlightsConfig['gainers-salary'],
      label: HighlightIcons[HighlightsConfig['gainers-salary']],
      displayValue: salary,
      displayChange: salaryChange,
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
