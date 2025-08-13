import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiCategory } from 'react-icons/bi';
import { CgList } from 'react-icons/cg';
import { MdOutlineCategory } from 'react-icons/md';

import { useOrderByState } from '@/hooks/useOrderByState';

import { CategoriesTable } from '../Pages/Common/CategoriesTable';
import { DomainsTable } from '../Pages/Common/DomainsTable';
import { SkillsTable } from '../Pages/Common/SkillsTable';
import { SkillFilter, SkillsFilterState } from '../SkillFilter/SkillFilter';
import { RouterTabs } from '../ui/RouterTabs';
import { KeySkills } from './KeySkills';
import { OrderButtons } from './OrderButtons';
import { TechnologiesTable } from './TechnologiesTable';

export function Tabs() {
  const { t } = useTranslation();

  const [skillsOrder, setSkillsOrder, skillsOrderButtons] = useOrderByState([
    'popular',
    'trending',
    'highestSalary',
  ]);
  const [domainsOrder, setDomainsOrder, domainsOrderButtons] = useOrderByState([
    'popular',
    'trending',
    'highestSalary',
  ]);
  const [categoriesOrder, setCategoriesOrder, categoriesOrderButtons] =
    useOrderByState(['popular', 'trending', 'highestSalary']);

  const tabs = [
    {
      title: (
        <div className="flex items-center">
          <div>
            <CgList />
          </div>
          <div className="ml-1">{t('common.skills')}</div>
        </div>
      ),
      body: (
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
            column: skillsOrder.column,
            descending: skillsOrder.descending,
          }}
          width={1150}
          text={<div>{t('common.allSkills')}</div>}
          pageSizes={[25, 50, 100]}
        />
      ),
      name: 'key-skills',
      append: (
        <OrderButtons
          onChange={b => setSkillsOrder(b)}
          buttons={skillsOrderButtons}
          currentButtonId={skillsOrder.id}
        />
      ),
    },
    {
      title: (
        <div className="flex items-center">
          <div>
            <MdOutlineCategory />
          </div>
          <div className="ml-1">{t('common.domains')}</div>
        </div>
      ),
      body: (
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
            column: domainsOrder.column,
            descending: domainsOrder.descending,
          }}
          width={1150}
          text={<div>{t('common.allDomains')}</div>}
          pageSizes={[25, 50, 100]}
          // onRowsChange={setTotalRows}
        />
      ),
      append: (
        <OrderButtons
          onChange={b => setDomainsOrder(b)}
          buttons={domainsOrderButtons}
          currentButtonId={domainsOrder.id}
        />
      ),
      name: 'domains',
    },
    {
      title: (
        <div className="flex items-center">
          <div>
            <BiCategory />
          </div>
          <div className="ml-1">{t('common.categories')}</div>
        </div>
      ),
      body: (
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
            column: categoriesOrder.column,
            descending: categoriesOrder.descending,
          }}
          width={1150}
          text={<div>{t('common.allCategories')}</div>}
          pageSizes={[25, 50, 100]}
          // onRowsChange={setTotalRows}
        />
      ),
      append: (
        <OrderButtons
          onChange={b => setCategoriesOrder(b)}
          buttons={categoriesOrderButtons}
          currentButtonId={categoriesOrder.id}
        />
      ),
      name: 'categories',
    },
  ];

  return <RouterTabs tabs={tabs} />;
}
