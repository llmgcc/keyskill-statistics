import { Category } from '@/interfaces';
import { useSkillFilter } from '@/providers/SkillFilterProvider';
import { useCategoriesStore } from '@/store/categoriesStore';
import { useDomainsStore } from '@/store/domainsStore';
import { TextField } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { BiCategory, BiSearch } from 'react-icons/bi';
import { MdOutlineCategory } from 'react-icons/md';

import CategoryFilter from './CategoryFilter';

export interface SkillsFilterState {
  category: {
    selected: Category | null;
    strict: boolean;
  };
  domain: {
    selected: Category | null;
    strict: boolean;
  };
  skill: string;
}

export function SkillsFilter() {
  const { t } = useTranslation();
  const { categories } = useCategoriesStore();
  const { domains } = useDomainsStore();

  const { filterState: state, setFilterState } = useSkillFilter();

  function updateDomainFilter(domain: Category | null, strict: boolean) {
    setFilterState({ ...state, domain: { selected: domain, strict: strict } });
  }

  function updateCategoryFilter(category: Category | null, strict: boolean) {
    setFilterState({
      ...state,
      category: { selected: category, strict: strict },
    });
  }

  function updateTextFilter(event: React.ChangeEvent<HTMLInputElement>) {
    setFilterState({ ...state, skill: event.target.value });
  }

  return (
    <div className="my-2 flex items-center justify-end gap-2">
      <div>
        <TextField.Root
          value={state.skill}
          onChange={updateTextFilter}
          placeholder={t('categoryFilter.placeholderForSkill')}
          className="border-shadow-full h-9 bg-background-secondary/50 outline-background-secondary md:h-7"
        >
          <TextField.Slot>
            <BiSearch />
          </TextField.Slot>
        </TextField.Root>
      </div>
      <div className="flex h-full items-center gap-2">
        <div className="">
          <CategoryFilter
            icon={<MdOutlineCategory className="text-blue-400" />}
            options={domains}
            categoryKey="domains"
            onChange={updateDomainFilter}
          />
        </div>
        <div>
          <CategoryFilter
            icon={<BiCategory className="text-yellow-400" />}
            options={categories}
            categoryKey="categories"
            onChange={updateCategoryFilter}
          />
        </div>
      </div>
    </div>
  );
}
