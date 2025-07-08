import { useTranslation } from 'react-i18next';

import { Category } from '@/interfaces';
import { useScreenSize } from '@/hooks/useScreenSize';

interface CategoryFilterTriggerProps {
  icon: JSX.Element;
  category: Category | null;
  categoryKey: 'categories' | 'domains';
}

export function CategoryFilterTrigger({
  icon,
  category,
  categoryKey,
}: CategoryFilterTriggerProps) {
  const { isMobile } = useScreenSize();
  const { t } = useTranslation();

  function triggerText() {
    if (category) {
      const shortKey =
        categoryKey === 'domains' ? 'domainsShort' : 'categoriesShort';
      return {
        shortName: t(`${shortKey}.${category.name}`),
        name: t(`${categoryKey}.${category.name}`),
      };
    } else {
      if (categoryKey == 'domains') {
        return {
          shortName: t('categoryFilter.all'),
          name: t('categoryFilter.allDomains'),
        };
      }
      return {
        shortName: t('categoryFilter.all'),
        name: t('categoryFilter.allCategories'),
      };
    }
  }

  const { shortName, name } = triggerText();

  return (
    <div className="flex items-center text-xs md:text-sm">
      <div>{icon}</div>
      <div className="ml-1 mr-2">{isMobile ? shortName : name}</div>
    </div>
  );
}
