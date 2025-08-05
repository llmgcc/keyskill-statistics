import { skillName } from '@/utils/common';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { BiNetworkChart } from 'react-icons/bi';
import { PiApproximateEquals } from 'react-icons/pi';

import { KeySkill } from '@/interfaces';
import { useOrderByState } from '@/hooks/useOrderByState';
import { RouterTabs } from '@/components/ui/RouterTabs';
import { OrderButtons } from '@/components/Tabs/OrderButtons';

import { SkillsTable } from '../Common/SkillsTable';

interface SkillPageTabsProps {
  skill: KeySkill | null;
}

export function SkillPageTabs({ skill }: SkillPageTabsProps) {
  const { t, i18n } = useTranslation();

  const [relatedOrder, setRelatedOrder, orderButtonsRelated] = useOrderByState([
    'popular',
    'trending',
    'highestSalary',
  ]);
  const [similarOrder, setSimilarOrder, orderButtonsSimilar] = useOrderByState([
    'similar',
    'popular',
    'trending',
    'highestSalary',
  ]);

  const tabs = useMemo(
    () => [
      {
        title: (
          <div className="flex flex-nowrap items-center gap-1 text-nowrap text-text-primary">
            <div>
              <BiNetworkChart />
            </div>
            <div className="text-nowrap">
              {t(`skillPage.relatedSkills.title`)}
            </div>
          </div>
        ),
        name: 'relatedSkills',
        body: (
          <SkillsTable
            paginationPrefix="related"
            enabled={!!skill}
            filter={{ related_to: skill?.name }}
            order_by={{
              order_by: relatedOrder.column,
              descending: relatedOrder.descending,
            }}
            width={1000}
            text={
              <Trans
                i18nKey="skillPage.relatedSkills.subtitle"
                components={{ b: <b /> }}
                values={{
                  name: skillName(skill, i18n.language),
                }}
              />
            }
          />
        ),
        append: (
          <OrderButtons
            onChange={b => setRelatedOrder(b)}
            buttons={orderButtonsRelated}
            currentButtonId={relatedOrder.id}
          />
        ),
      },
      {
        title: (
          <div className="flex flex-nowrap items-center gap-1 text-nowrap text-text-primary">
            <div>
              <PiApproximateEquals />
            </div>
            <div className="text-nowrap">
              {t(`skillPage.similarSkills.title`)}
            </div>
          </div>
        ),
        name: 'similarSkills',
        append: (
          <OrderButtons
            onChange={b => setSimilarOrder(b)}
            buttons={orderButtonsSimilar}
            currentButtonId={similarOrder.id}
          />
        ),
        body: (
          <SkillsTable
            columns={[
              'place',
              'image',
              'name',
              'similarity_score',
              'average_salary',
              'count',
              'chart',
            ]}
            paginationPrefix="similar"
            enabled={!!skill}
            filter={{ similar_to: skill?.name }}
            order_by={{
              order_by: similarOrder.column,
              descending: similarOrder.descending,
            }}
            width={1100}
            text={
              <Trans
                i18nKey="skillPage.similarSkills.subtitle"
                components={{ b: <b /> }}
                values={{
                  name: skillName(skill, i18n.language),
                }}
              />
            }
          />
        ),
      },
    ],
    [
      skill,
      t,
      orderButtonsSimilar,
      similarOrder,
      orderButtonsRelated,
      setSimilarOrder,
      relatedOrder,
      setRelatedOrder,
      i18n.language,
    ]
  );

  return (
    <div className="w-full rounded border-background-secondary">
      <RouterTabs tabs={tabs} />
    </div>
  );
}
