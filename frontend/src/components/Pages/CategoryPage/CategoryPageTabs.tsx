import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BiNetworkChart } from 'react-icons/bi';
import { PiApproximateEquals } from 'react-icons/pi';

import { Category } from '@/interfaces';
import { useOrderByState } from '@/hooks/useOrderByState';
import { useCurrencyStore } from '@/store/currencyStore';
import { RouterTabs } from '@/components/ui/RouterTabs';
import { buttonsList, OrderButtons } from '@/components/Tabs/OrderButtons';

import { SkillsTable } from '../Common/SkillsTable';

interface CategoryPageTabsProps {
  category: Category | null;
}

export function CategoryPageTabs({ category }: CategoryPageTabsProps) {
  const { t } = useTranslation();
  const selectedCurrency = useCurrencyStore(state => state.selectedCurrency);

  const [strictOrder, setStrictOrder, orderButtonsStrict] = useOrderByState([
    'popular',
    'trending',
    'highestSalary',
  ]);
  const [allOrder, setAllOrder, orderButtonsAll] = useOrderByState([
    'popular',
    'trending',
    'highestSalary',
  ]);

  const tabs = useMemo(
    () => [
      {
        title: (
          <div className="flex items-center gap-1 text-nowrap text-text-primary">
            <div>
              <BiNetworkChart />
            </div>
            <div>{t(`skillPage.relatedSkills.title`)}</div>
          </div>
        ),
        name: 'relatedSkills',
        body: (
          <SkillsTable
            filter={{ category: category?.name, strict: true }}
            order_by={{
              order_by: strictOrder.column,
              descending: strictOrder.descending,
            }}
          />
        ),
        append: (
          <OrderButtons
            onChange={b => setStrictOrder(b)}
            buttons={orderButtonsStrict}
            currentButtonId={strictOrder.id}
          />
        ),
      },
      {
        title: (
          <div className="flex items-center gap-1 text-nowrap text-text-primary">
            <div>
              <PiApproximateEquals />
            </div>
            <div>{t(`skillPage.similarSkills.title`)}</div>
          </div>
        ),
        name: 'similarSkills',
        append: (
          <OrderButtons
            onChange={b => setAllOrder(b)}
            buttons={orderButtonsAll}
            currentButtonId={allOrder.id}
          />
        ),
        body: (
          <SkillsTable
            filter={{ category: category?.name, strict: false }}
            order_by={{
              order_by: allOrder.column,
              descending: allOrder.descending,
            }}
          />
        ),
      },
    ],
    [
      orderButtonsStrict,
      orderButtonsAll,
      strictOrder,
      allOrder,
      setStrictOrder,
      setAllOrder,
      t,
      category,
    ]
  );

  return (
    <div className="w-full rounded border-background-secondary">
      <RouterTabs tabs={tabs} />
    </div>
  );
}
