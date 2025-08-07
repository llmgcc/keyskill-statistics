import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { useOrderByState } from '@/hooks/useOrderByState';
import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { AppBreadcrumb } from '@/components/ui/Breadcrumb';
import { OrderButtons } from '@/components/Tabs/OrderButtons';
import { ListEnumeration } from '@/components/TextSection/ListEnumeration';

import { SkillsTable } from '../Common/SkillsTable';
import { StickyFilter } from '../Common/StickyFilter';

export function Skills() {
  const { t } = useTranslation();
  const selectedPeriod = usePeriodStore(state => state.selectedPeriod);
  const selectedExperience = useExperienceStore(
    state => state.selectedExperience
  );
  const [totalRows, setTotalRows] = useState<number | null>(null);

  const [order, setOrder, orderButtons] = useOrderByState([
    'popular',
    'trending',
    'highestSalary',
  ]);

  return (
    <div className="app-container">
      <AppBreadcrumb
        routes={[
          { displayName: t('common.mainPage'), url: '/' },
          { displayName: t('common.skills'), url: '/skills' },
        ]}
      />
      <div className="pb-4">
        <h1 className="text-3xl font-bold leading-[130%] text-text">
          {t('skills.title')}
        </h1>
        <div className="text-base leading-relaxed text-text-secondary">
          {/* {t('skills.subtitle')} */}
          <Trans
            i18nKey="skills.subtitle"
            values={{
              skillCount: totalRows,
              days: selectedPeriod,
              experienceText: t(`skills.experienceText.${selectedExperience}`),
            }}
            components={{
              text: <span className="font-[500] text-text-primary" />,
              examples: (
                <ListEnumeration
                  list={['Python', 'Docker', 'Git', 'PostgreSQL']}
                  maxToDisplay={4}
                />
              ),
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
            'favourite_skill',
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
            order_by: order.column,
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
