import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Categories as CategoriesConfig } from '@/config/categories';
import { useOrderByState } from '@/hooks/useOrderByState';
import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { AppBreadcrumb } from '@/components/ui/Breadcrumb';
import { OrderButtons } from '@/components/Tabs/OrderButtons';
import { ListEnumeration } from '@/components/TextSection/ListEnumeration';

import { CategoriesTable } from '../Common/CategoriesTable';
import { StickyFilter } from '../Common/StickyFilter';

export function Categories() {
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
          { displayName: t('common.categories'), url: '/categories' },
        ]}
      />
      <div className="pb-4">
        <h1 className="text-3xl font-bold leading-[130%] text-text">
          {t('categoriesPage.title')}
        </h1>
        <div className="text-base leading-relaxed text-text-secondary">
          <Trans
            i18nKey="categoriesPage.subtitle"
            values={{
              categoryCount: totalRows,
              days: selectedPeriod,
              experienceText: t(`skills.experienceText.${selectedExperience}`),
            }}
            components={{
              text: <span className="font-[500] text-text-primary" />,
              examples: (
                <ListEnumeration
                  list={[
                    t(`categories.${CategoriesConfig.Databases}`),
                    t(`categories.${CategoriesConfig.Languages}`),
                    t(
                      `categories.${CategoriesConfig['API Technologies & Standards']}`
                    ),
                    t(`categories.${CategoriesConfig['Operating systems']}`),
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
        <CategoriesTable
          columns={[
            'favourite_category',
            'place',
            'prev_place',
            'image',
            'name',
            'complexity',
            'average_salary',
            'count',
            'chart',
          ]}
          paginationPrefix="categories"
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
