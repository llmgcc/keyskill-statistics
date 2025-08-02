import { useTranslation } from 'react-i18next';

import { Category } from '@/interfaces';
import { CategoryDescription as CategoryDescriptionEnum } from '@/config/categories';
import { DomainDescription } from '@/config/domains';

import { Description } from './Description';

interface CategoryDescriptionProps {
  categoryKey: 'domains' | 'categories';
  category: Category | null;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  image?: boolean;
}

export function CategoryDescription({
  categoryKey,
  category,
  size = 'md',
  isLoading,
  image = true,
}: CategoryDescriptionProps) {
  const { t } = useTranslation();

  function categoryDescription() {
    const categoryName = category?.name;
    if (!categoryName || isLoading) return;
    if (categoryKey == 'domains') {
      if (Object.keys(DomainDescription).includes(categoryName)) {
        return t(`domainDescription.${categoryName}`);
      }
    }
    if (categoryKey == 'categories') {
      if (Object.keys(CategoryDescriptionEnum).includes(categoryName)) {
        return t(`categoryDescription.${categoryName}`);
      }
    }
    return null;
  }

  return (
    <Description
      displayName={t(`${categoryKey}.${category?.name}`)}
      subtitle={
        !isLoading ? (
          <div>{categoryDescription()}</div>
        ) : (
          <div className="h-full min-w-10">-</div>
        )
      }
      allTimePlace={category?.all_time_place ?? 0}
      isLoading={isLoading}
      size={size}
      image={image}
      imageProps={{
        size: size,
        [categoryKey]: category?.name,
      }}
    />
  );
}
