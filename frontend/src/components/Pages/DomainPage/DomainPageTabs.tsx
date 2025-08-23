import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { BiCrown, BiGrid } from 'react-icons/bi';

import { Category } from '@/interfaces';
import { useOrderByState } from '@/hooks/useOrderByState';
import { OrderButtons } from '@/components/ui/OrderButtons';
import { RouterTabs } from '@/components/ui/RouterTabs';

import { SkillsTable } from '../Common/SkillsTable';

interface DomainPageTabsProps {
  domain: Category | null;
}

export function DomainPageTabs({ domain }: DomainPageTabsProps) {
  const { t } = useTranslation();

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
              <BiCrown />
            </div>
            <div>{t(`categoryPage.primarySkills.title`)}</div>
          </div>
        ),
        name: 'coreSkills',
        body: (
          <SkillsTable
            enabled={!!domain}
            filter={{ domain: domain?.name, strict: true }}
            order_by={{
              column: strictOrder.column,
              descending: strictOrder.descending,
            }}
            paginationPrefix="core"
            columns={[
              'place',
              'image',
              'name',
              `${domain?.name}-confidence`,
              'average_salary',
              'count',
              'chart',
            ]}
            text={
              domain?.name ? (
                <Trans
                  i18nKey="domainPage.primarySkills.subtitle"
                  components={{ b: <b /> }}
                  values={{
                    category: t(`domains.${domain?.name}`),
                  }}
                />
              ) : (
                ''
              )
            }
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
              <BiGrid />
            </div>
            <div>{t(`categoryPage.allSkills.title`)}</div>
          </div>
        ),
        name: 'allSkills',
        append: (
          <OrderButtons
            onChange={b => setAllOrder(b)}
            buttons={orderButtonsAll}
            currentButtonId={allOrder.id}
          />
        ),
        body: (
          <SkillsTable
            enabled={!!domain}
            filter={{ domain: domain?.name, strict: false }}
            order_by={{
              column: allOrder.column,
              descending: allOrder.descending,
            }}
            paginationPrefix="all"
            columns={[
              'place',
              'image',
              'name',
              `${domain?.name}-confidence`,
              'average_salary',
              'count',
              'chart',
            ]}
            text={
              domain?.name ? (
                <Trans
                  i18nKey="domainPage.allSkills.subtitle"
                  components={{ b: <b /> }}
                  values={{
                    category: t(`domains.${domain.name}`),
                  }}
                />
              ) : (
                ''
              )
            }
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
      domain,
    ]
  );

  return (
    <div className="w-full rounded border-background-secondary">
      <RouterTabs tabs={tabs} />
    </div>
  );
}
