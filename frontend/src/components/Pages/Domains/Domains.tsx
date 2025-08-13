import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Domains as DomainsConfig } from '@/config/domains';
import { useOrderByState } from '@/hooks/useOrderByState';
import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { AppBreadcrumb } from '@/components/ui/Breadcrumb';
import { OrderButtons } from '@/components/Tabs/OrderButtons';
import { ListEnumeration } from '@/components/TextSection/ListEnumeration';

import { DomainsTable } from '../Common/DomainsTable';
import { StickyFilter } from '../Common/StickyFilter';

export function Domains() {
  const { t } = useTranslation();
  const [totalRows, setTotalRows] = useState<number | null>(null);
  const selectedPeriod = usePeriodStore(state => state.selectedPeriod);
  const selectedExperience = useExperienceStore(
    state => state.selectedExperience
  );
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
          { displayName: t('common.domains'), url: '/domains' },
        ]}
      />
      <div className="pb-4">
        <h1 className="text-3xl font-bold leading-[130%] text-text">
          {t('domainsPage.title')}
        </h1>
        <div className="text-base leading-relaxed text-text-secondary">
          <Trans
            i18nKey="domainsPage.subtitle"
            values={{
              domainCount: totalRows,
              days: selectedPeriod,
              experienceText: t(`skills.experienceText.${selectedExperience}`),
            }}
            components={{
              text: <span className="font-[500] text-text-primary" />,
              examples: (
                <ListEnumeration
                  list={[
                    t(`domains.${DomainsConfig['Data Science']}`),
                    t(`domains.${DomainsConfig['Backend development']}`),
                    t(`domains.${DomainsConfig['DevOps & Infrastructure']}`),
                    t(`domains.${DomainsConfig.Blockchain}`),
                  ]}
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
        <DomainsTable
          columns={[
            'favourite_domain',
            'place',
            'prev_place',
            'image',
            'name',
            'complexity',
            'average_salary',
            'count',
            'chart',
          ]}
          paginationPrefix="domains"
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
