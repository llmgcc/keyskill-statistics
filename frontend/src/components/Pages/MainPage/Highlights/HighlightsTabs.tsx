import { placeholderData } from '@/utils/common';
import { useState } from 'react';
import { SegmentGroup } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { KeySkill } from '@/interfaces';
import {
  HighlightIcons,
  Highlights as HighlightsConfig,
} from '@/config/highlights';
import { useHighlights } from '@/hooks/data/useHighlights';
import { Overlay } from '@/components/ui/Overlay';

import {
  HighlightCardBody,
  HighlightSeeMore,
} from '../../Highlights/HighlightsPage';

export interface HighlightTab {
  value: HighlightsConfig;
  label: JSX.Element;
  displayValue: (skill: KeySkill) => JSX.Element;
  displayChange: (skill: KeySkill) => JSX.Element;
}

export interface HighlightsTabsProps {
  tabs: HighlightTab[];
}

export function HighlightsTabs({ tabs }: HighlightsTabsProps) {
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
        {currentTab && (
          <HighlightCardBody
            maxToDisplay={6}
            value={currentTab.displayValue}
            change={currentTab.displayChange}
            highlights={highlights ?? placeholderData(10)}
            isLoading={isLoading}
          />
        )}
      </div>
    </Overlay>
  );
}
