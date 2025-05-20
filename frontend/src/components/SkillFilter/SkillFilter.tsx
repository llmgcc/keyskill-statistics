import { Category } from '@/interfaces';
import { useCategoriesStore } from '@/store/categoriesStore';
import { useDomainsStore } from '@/store/domainsStore';
import { BiCategory } from 'react-icons/bi';
import { MdOutlineCategory } from 'react-icons/md';

import CategoryFilter from './CategoryFilter';
import { SkillNameFilter } from './SkillNameFilter';

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

interface SkillFilterProps {
  filter: SkillsFilterState;
  onFilterChanged: (filter: SkillsFilterState) => void;
}

export function SkillFilter({
  filter: filterState,
  onFilterChanged,
}: SkillFilterProps) {
  const categories = useCategoriesStore((state) => state.categories);
  const domains = useDomainsStore((state) => state.domains);

  function updateDomainFilter(domain: Category | null, strict: boolean) {
    onFilterChanged({
      ...filterState,
      domain: { selected: domain, strict: strict },
    });
  }

  function updateCategoryFilter(category: Category | null, strict: boolean) {
    onFilterChanged({
      ...filterState,
      category: { selected: category, strict: strict },
    });
  }

  function updateTextFilter(skill: string) {
    onFilterChanged({ ...filterState, skill });
  }

  return (
    <div className="mt-2 flex items-center justify-end gap-2 md:mt-0">
      <div>
        <SkillNameFilter
          skill={filterState.skill}
          onChange={updateTextFilter}
        />
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
