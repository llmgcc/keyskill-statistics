import { useTranslation } from 'react-i18next';

import { Category } from '@/interfaces';
import { CategoriesStyle } from '@/config/categories';
import { DomainsStyle } from '@/config/domains';
import { useScreenSize } from '@/hooks/useScreenSize';
import { SelectItem } from '@/components/ui/AppSelect';

interface CategoryFilterItemProps {
  category: Category | null;
  categoryKey: 'categories' | 'domains';
}

export function CategoryFilterItem({
  category,
  categoryKey,
}: CategoryFilterItemProps) {
  const { t } = useTranslation();
  const { isMobile } = useScreenSize();

  const defaultName = categoryKey == 'domains' ? 'allDomains' : 'allCategories';
  function displayDefaultNameKey() {
    if (categoryKey == 'domains') {
      return isMobile ? 'all' : 'allDomains';
    }
    return isMobile ? 'all' : 'allCategories';
  }

  function displayDefaultName() {
    const translationKey = displayDefaultNameKey();
    return t(`categoryFilter.${translationKey}`);
  }

  function getColor(c: Category | null) {
    const colorsList: {
      [key: string]: {
        color: string;
        logo: JSX.Element;
      };
    } = categoryKey == 'domains' ? DomainsStyle : CategoriesStyle;
    if (c?.name && c?.name in colorsList) {
      return colorsList[c.name].color;
    }
    return 'rgb(var(--color-background-gray))';
  }

  return (
    <SelectItem
      className="flex cursor-pointer items-center justify-between bg-background-primary p-2 hover:bg-background-secondary focus:outline-none"
      key={category?.name ?? defaultName}
      value={category?.name ?? defaultName}
    >
      <div className="flex items-center">
        <div
          className="aspect-square h-4 w-4 rounded"
          style={{ backgroundColor: getColor(category) }}
        ></div>
        <div className="mx-1 max-w-56 truncate text-sm text-text">
          {category?.name
            ? t(`${categoryKey}.${category.name}`)
            : displayDefaultName()}
        </div>
      </div>
    </SelectItem>
  );
}
