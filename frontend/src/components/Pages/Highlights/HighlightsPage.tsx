import { placeholderData } from '@/utils/common';
import { Button } from '@chakra-ui/react';
import { Trans, useTranslation } from 'react-i18next';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { KeySkill } from '@/interfaces';
import { HighlightIcons, Highlights } from '@/config/highlights';
import { useHighlights } from '@/hooks/data/useHighlights';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { AppBreadcrumb } from '@/components/ui/Breadcrumb';
import { CurrencyDisplay } from '@/components/ui/CurrencyDisplay';
import { SkillDescription } from '@/components/ui/Description/SkillDescription';
import { Overlay } from '@/components/ui/Overlay';
import { ValueChangeRenderer } from '@/components/Table/renderers/ValueChangeRenderer';

import { StickyFilter } from '../Common/StickyFilter';

interface HighlightCardProps {
  type: Highlights;
  value: (skill: KeySkill) => JSX.Element;
  change: (skill: KeySkill) => JSX.Element;
}

interface HighlightSeeMoreProps {
  type: Highlights;
  short?: boolean;
}

interface HighlightCardBodyProps {
  highlights: KeySkill[];
  value: (skill: KeySkill) => JSX.Element;
  change: (skill: KeySkill) => JSX.Element;
  isLoading: boolean;
  maxToDisplay?: number;
}

export function HighlightCardBody({
  highlights,
  isLoading,
  value,
  change,
  maxToDisplay = 10,
}: HighlightCardBodyProps) {
  const navigate = useNavigate();
  return (
    <div className="divide-y divide-background-secondary">
      {(
        highlights?.slice(0, maxToDisplay) ??
        placeholderData(10).slice(0, maxToDisplay)
      ).map(h => (
        <div
          key={h.name}
          className="flex cursor-pointer items-center justify-between p-2 hover:bg-background-secondary"
          onClick={() =>
            !isLoading && navigate(`/skill/${encodeURIComponent(h.name)}`)
          }
        >
          <div className="min-w-0 flex-[5] pr-4">
            <SkillDescription skill={h} />
          </div>

          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="flex flex-col items-end">
              <div className="text-sm font-medium">{value(h)}</div>
              <div className="text-xs">{change(h)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function HighlightSeeMore({
  type,
  short = false,
}: HighlightSeeMoreProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Button
      size="xs"
      variant="ghost"
      className="p-1 hover:bg-background-secondary"
      onClick={() => navigate(`/highlights/${type}`)}
    >
      {!short && t('common.seeMore')} <MdKeyboardArrowRight />
    </Button>
  );
}

function HighlightCard({ type, value, change }: HighlightCardProps) {
  const { highlights, isLoading, isFetching } = useHighlights(type);
  const { t } = useTranslation();

  return (
    <Overlay isFetching={isFetching} isLoading={isLoading}>
      <div className="h-full w-full overflow-hidden rounded border-[1px] border-background-secondary shadow-sm">
        <div className="bg-background flex items-center justify-between border-b-[1px] border-background-secondary p-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            {HighlightIcons[type]}
            <span>{t(`highlights.${type}`)}</span>
          </div>
          <HighlightSeeMore type={type} />
        </div>

        <HighlightCardBody
          value={value}
          change={change}
          highlights={highlights ?? placeholderData(10)}
          isLoading={isLoading}
        />
      </div>
    </Overlay>
  );
}

export function HighlightsPage() {
  const count = (skill: KeySkill) => <div>{skill.count ?? 0}</div>;
  const salary = (skill: KeySkill) => (
    <CurrencyDisplay valueInRUB={skill.average_salary ?? 0} />
  );

  const countChange = (skill: KeySkill) => (
    <ValueChangeRenderer
      current={skill.count ?? 0}
      prev={skill.prev_count}
      percent={true}
    />
  );
  const salaryChange = (skill: KeySkill) => (
    <ValueChangeRenderer
      current={skill.average_salary ?? 0}
      prev={skill.prev_average_salary}
      percent={true}
    />
  );

  const { t } = useTranslation();
  const selectedPeriod = usePeriodStore(state => state.selectedPeriod);
  const selectedExperience = useExperienceStore(
    state => state.selectedExperience
  );
  useDocumentTitle(t('common.highlights'));

  return (
    <div className="app-container justify-center">
      <AppBreadcrumb
        routes={[
          { displayName: t('common.mainPage'), url: '/' },
          { displayName: t('common.highlights'), url: '/highlights' },
        ]}
      />
      <div className="pb-4">
        <h1 className="text-3xl font-bold leading-[130%] text-text">
          {t('highlightsPage.title')}
        </h1>
        <div className="text-base leading-relaxed text-text-secondary">
          {/* {t('skills.subtitle')} */}
          <Trans
            i18nKey="highlightsPage.subtitle"
            values={{
              days: selectedPeriod,
              experienceText: t(`skills.experienceText.${selectedExperience}`),
            }}
            components={{
              text: <span className="font-[500] text-text-primary" />,
            }}
          />
        </div>
      </div>
      <div className="mb-6">
        <StickyFilter />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <div>
          <HighlightCard
            type={Highlights.gainers}
            value={count}
            change={countChange}
          />
        </div>
        <div>
          <HighlightCard
            type={Highlights.decliners}
            value={count}
            change={countChange}
          />
        </div>
        <div>
          <HighlightCard
            type={Highlights.new}
            value={count}
            change={countChange}
          />
        </div>
        <div>
          <HighlightCard
            type={Highlights['highest-salary']}
            value={salary}
            change={salaryChange}
          />
        </div>
        <div>
          <HighlightCard
            type={Highlights['lowest-salary']}
            value={salary}
            change={salaryChange}
          />
        </div>
        <div>
          <HighlightCard
            type={Highlights['growingSalary']}
            value={salary}
            change={salaryChange}
          />
        </div>
      </div>
    </div>
  );
}
