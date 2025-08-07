import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { BiCategory } from 'react-icons/bi';
import { CgList } from 'react-icons/cg';
import { MdOutlineCategory } from 'react-icons/md';

import { useOrderByState } from '@/hooks/useOrderByState';
import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { AppBreadcrumb } from '@/components/ui/Breadcrumb';
import { RouterTabs } from '@/components/ui/RouterTabs';
import { OrderButtons } from '@/components/Tabs/OrderButtons';

import { StickyFilter } from '../Common/StickyFilter';
import { FavouriteCategories } from './FavouriteCategories';
import { FavouriteDomains } from './FavouriteDomains';
import { FavouriteSkills } from './FavouriteSkills';

export function Favourites() {
  const { t } = useTranslation();
  const selectedPeriod = usePeriodStore(state => state.selectedPeriod);
  const selectedExperience = useExperienceStore(
    state => state.selectedExperience
  );

  const [orderSkills, setSkillsOrder, orderButtonsSkills] = useOrderByState([
    'popular',
    'trending',
    'highestSalary',
  ]);
  const [orderDomains, setDomainsOrder, orderButtonsDomains] = useOrderByState([
    'popular',
    'trending',
    'highestSalary',
  ]);
  const [orderCategories, setCategoriesOrder, orderButtonsCategories] =
    useOrderByState(['popular', 'trending', 'highestSalary']);
  const tabs = useMemo(
    () => [
      {
        title: (
          <div className="flex items-center gap-1 text-nowrap text-text-primary">
            <div>
              <CgList />
            </div>
            <div>{t(`common.skills`)}</div>
          </div>
        ),
        name: 'skills',
        body: (
          <FavouriteSkills
            order_by={{
              order_by: orderSkills.column,
              descending: orderSkills.descending,
            }}
          />
        ),
        append: (
          <OrderButtons
            onChange={b => setSkillsOrder(b)}
            buttons={orderButtonsSkills}
            currentButtonId={orderSkills.id}
          />
        ),
      },
      {
        title: (
          <div className="flex items-center gap-1 text-nowrap text-text-primary">
            <div>
              <MdOutlineCategory />
            </div>
            <div>{t(`common.domains`)}</div>
          </div>
        ),
        name: 'domains',
        body: (
          <FavouriteDomains
            order_by={{
              order_by: orderDomains.column,
              descending: orderDomains.descending,
            }}
          />
        ),
        append: (
          <OrderButtons
            onChange={b => setDomainsOrder(b)}
            buttons={orderButtonsDomains}
            currentButtonId={orderDomains.id}
          />
        ),
      },
      {
        title: (
          <div className="flex items-center gap-1 text-nowrap text-text-primary">
            <div>
              <BiCategory />
            </div>
            <div>{t(`common.categories`)}</div>
          </div>
        ),
        name: 'categories',
        body: (
          <FavouriteCategories
            order_by={{
              order_by: orderCategories.column,
              descending: orderCategories.descending,
            }}
          />
        ),
        append: (
          <OrderButtons
            onChange={b => setCategoriesOrder(b)}
            buttons={orderButtonsCategories}
            currentButtonId={orderCategories.id}
          />
        ),
      },
    ],
    [
      orderSkills,
      orderCategories,
      orderDomains,
      orderButtonsSkills,
      orderButtonsCategories,
      orderButtonsDomains,
      t,
      setSkillsOrder,
      setDomainsOrder,
      setCategoriesOrder,
    ]
  );

  return (
    <div className="app-container">
      <AppBreadcrumb
        routes={[
          { displayName: t('common.mainPage'), url: '/' },
          { displayName: t('common.favourites'), url: '/favourites' },
        ]}
      />
      <div className="pb-4">
        <h1 className="text-3xl font-bold leading-[130%] text-text">
          {t('favouritesPage.title')}
        </h1>
        <div className="text-base leading-relaxed text-text-secondary">
          <Trans
            i18nKey="favouritesPage.subtitle"
            values={{
              domainCount: 0,
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

      <RouterTabs tabs={tabs} />
    </div>
  );
}
