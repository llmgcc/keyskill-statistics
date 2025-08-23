import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { Highlights, OrderByHighlightType } from '@/config/highlights';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useOrderByState } from '@/hooks/useOrderByState';
import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { AppBreadcrumb } from '@/components/ui/Breadcrumb';
import { OrderButtons } from '@/components/ui/OrderButtons';

import { SkillsTable } from '../Common/SkillsTable';
import { StickyFilter } from '../Common/StickyFilter';

export function HighlightTypePage() {
  const { type } = useParams<{ type: string }>();
  const [totalRows, setTotalRows] = useState<number | null>(null);
  const navigate = useNavigate();

  const { t } = useTranslation();
  const selectedPeriod = usePeriodStore(state => state.selectedPeriod);
  const selectedExperience = useExperienceStore(
    state => state.selectedExperience
  );
  const isError = !Object.keys(Highlights).includes(type ?? '');

  const [order, setOrder, orderButtons] = useOrderByState([
    type ? OrderByHighlightType[type as Highlights] : '',
  ]);

  useEffect(() => {
    if (isError) {
      navigate('/highlights');
    }
  }, [type, navigate, isError]);

  useDocumentTitle(t(`highlights.${type}`));

  if (isError) {
    return null;
  }

  return (
    <div className="app-container">
      <AppBreadcrumb
        routes={[
          { displayName: t('common.mainPage'), url: '/' },
          { displayName: t('common.highlights'), url: '/highlights' },
          { displayName: t(`highlights.${type}`), url: '/highlights/' },
        ]}
      />
      <div className="pb-4">
        <h1 className="text-3xl font-bold leading-[130%] text-text">
          {t(`highlightsPage.highlightType.${type}.title`)}
        </h1>
        <div className="text-base leading-relaxed text-text-secondary">
          <Trans
            i18nKey={`highlightsPage.highlightType.${type}.subtitle`}
            values={{
              skillCount: totalRows,
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
      <div>
        <SkillsTable
          columns={[
            'favorite_skill',
            'place',
            'prev_place',
            'image',
            'name',
            'complexity',
            'average_salary',
            'count',
            'chart',
          ]}
          paginationPrefix="skills"
          enabled={true}
          order_by={{
            column: order.column,
            descending: order.descending,
          }}
          width={1150}
          text={
            <OrderButtons
              onChange={b => setOrder(b)}
              buttons={orderButtons}
              currentButtonId={order.id}
            />
          }
          pageSizes={[25, 50, 100]}
          onRowsChange={setTotalRows}
        />
      </div>
    </div>
  );
}
