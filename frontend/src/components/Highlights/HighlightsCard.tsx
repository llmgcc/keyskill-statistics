import { memo, useState } from 'react';
import { SegmentedControl } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';

import { KeySkill } from '@/interfaces';
import { Experience } from '@/config/experience';
import { HighlightsCardTab } from '@/components/Highlights/HighlightsCardTab';

export interface HiglightBase {
  icon: JSX.Element;
  source: (period: number, experience?: Experience) => Promise<KeySkill[]>;
  valueRenderer: (skill: KeySkill) => JSX.Element | null;
}

interface HighlightsCardProps {
  highlights: Record<string, HiglightBase>;
}

function _HighlightsCard({ highlights }: HighlightsCardProps) {
  const [currentTab, setCurrentTab] = useState<string>(
    Object.keys(highlights)?.[0]
  );
  const { t } = useTranslation();

  return (
    <div className="bg-background z-50 h-full w-full rounded-md border-[1px] border-background-secondary text-text shadow-sm shadow-background-secondary">
      <div className="flex items-center justify-between border-b-[1px] border-background-secondary p-2">
        <div className="text-sm font-[500]">
          {t(`highlights.${currentTab}`)}
        </div>
        <div>
          <div className="">
            <div className="flex">
              <SegmentedControl.Root
                defaultValue={currentTab}
                size={'1'}
                variant="surface"
                onValueChange={v => setCurrentTab(v)}
              >
                {Object.keys(highlights).map(k => (
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
        </div>
      </div>
      <div className="p-2">
        <div>
          {!!currentTab && (
            <HighlightsCardTab
              title={currentTab}
              source={highlights[currentTab].source}
              valueRenderer={highlights[currentTab].valueRenderer}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export const HighlightsCard = memo(_HighlightsCard);
