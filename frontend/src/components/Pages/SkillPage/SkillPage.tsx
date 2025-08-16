import { skillName } from '@/utils/common';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useSkillDetails } from '@/hooks/data/useSkillDetails';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { AppBreadcrumb } from '@/components/ui/Breadcrumb';

import { Complexity } from '../Common/Complexity';
import { PredictionsCard, PredictionTooltip } from '../Common/PredictionsCard';
import { StickyFilter } from '../Common/StickyFilter';
import { SkillHeader } from './SkillHeader';
import { SkillPageTabs } from './SkillPageTabs';
import { SkillSalary } from './SkillSalary';
import { SkillTrend } from './SkillTrend';

export function SkillPage() {
  const { name } = useParams<{ name: string }>();
  const decodedName = name ? decodeURIComponent(name) : null;
  const navigate = useNavigate();
  const { skillDetails, isLoading, isFetching, isError } = useSkillDetails(
    decodedName ?? null
  );
  const { i18n, t } = useTranslation();
  const skillChanged = skillDetails?.name !== name;

  useDocumentTitle(
    skillDetails?.name ? skillName(skillDetails, i18n.language) : null
  );

  if (isError) {
    navigate('/');
  }

  return (
    <div className="app-container">
      <AppBreadcrumb
        className="pb-1"
        routes={[
          { displayName: t('common.mainPage'), url: '/' },
          { displayName: t('common.skills'), url: '/skills' },
          {
            displayName: skillDetails?.name
              ? (skillName(skillDetails, i18n.language) ?? '')
              : '',
            url: '/skills/',
          },
        ]}
      />
      <div className="rounded bg-background-primary">
        <div>
          <SkillHeader skill={skillDetails} isLoading={skillChanged} />
        </div>

        <StickyFilter />

        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="w-full lg:flex-[65]">
            <SkillTrend
              skill={skillDetails ?? null}
              isDataReady={!(isLoading || isFetching)}
            />
          </div>
          <div className="w-full lg:flex-[35]">
            <SkillSalary
              skill={skillDetails ?? null}
              isDataReady={!(isLoading || isFetching)}
            />
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-2 2xl:flex-row">
          <div className="order-2 flex flex-[70] flex-col gap-2 2xl:order-1">
            <Complexity
              data={skillDetails ?? null}
              isDataReady={!(isLoading || isFetching)}
            />
            <SkillPageTabs
              skill={skillChanged ? null : (skillDetails ?? null)}
            />
          </div>
          <div className="order-1 flex-[30] 2xl:order-2">
            <div className="flex flex-col gap-2">
              <PredictionsCard
                categories={skillDetails?.domains ?? []}
                type="domains"
                isDataReady={!(isLoading || isFetching)}
                tooltip={
                  <PredictionTooltip
                    name={skillName(skillDetails ?? null, i18n.language)}
                    translationKey="charts.tooltips.prediction.domain"
                  />
                }
              />
              <PredictionsCard
                categories={skillDetails?.categories ?? []}
                type="categories"
                isDataReady={!(isLoading || isFetching)}
                tooltip={
                  <PredictionTooltip
                    name={skillName(skillDetails ?? null, i18n.language)}
                    translationKey="charts.tooltips.prediction.category"
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
