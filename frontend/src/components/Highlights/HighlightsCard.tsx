import { useState } from 'react';
import { KeySkill } from '@/interfaces';
import { SegmentedControl } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';

import { Experience } from '@/config/experience';

import { HighlightsCardTab } from './HighlightsCardTab';
import StatCard from './StatCard';

export type HiglightBase = {
  icon: JSX.Element;
  source: (period: number, experience?: Experience) => Promise<KeySkill[]>;
  valueRenderer: (skill: KeySkill) => JSX.Element | null;
};

type HighlightsCardProps = {
  highlights: Record<string, HiglightBase>;
};

export function HighlightsCard({ highlights }: HighlightsCardProps) {
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
              variant="surface"
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
