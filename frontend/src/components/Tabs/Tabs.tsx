import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiCategory } from 'react-icons/bi';
import { CgList } from 'react-icons/cg';
import { MdOutlineCategory } from 'react-icons/md';

import { SkillFilter, SkillsFilterState } from '../SkillFilter/SkillFilter';
import { TabNavigation } from '../ui/TabNavigation';
import { CategoriesTable } from './CategoriesTable';
import KeySkills from './KeySkills';
import { TechnologiesTable } from './TechnologiesTable';

export function Tabs() {
  const { t } = useTranslation();

  const [filterState, setFilterState] = useState<SkillsFilterState>({
    category: { selected: null, strict: true },
    domain: { selected: null, strict: true },
    skill: '',
  });

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
      body: <KeySkills filter={filterState} />,
      name: 'key-skills',
      append: (
        <div className="flex h-fit w-full items-end justify-end text-right">
          <SkillFilter filter={filterState} onFilterChanged={setFilterState} />
        </div>
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
      body: <CategoriesTable />,
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
      body: <TechnologiesTable />,
      name: 'categories',
    },
  ];

  return <TabNavigation tabs={tabs} />;
}
