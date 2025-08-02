import { useTranslation } from 'react-i18next';

import { Category } from '@/interfaces';
import { CategoryDescription } from '@/components/ui/Description/CategoryDescription';

import { Header } from '../Common/Header';

interface CategoryHeaderProps {
  category?: Category;
  isLoading: boolean;
}

export function CategoryHeader({ category, isLoading }: CategoryHeaderProps) {
  const { t } = useTranslation();
  return (
    <Header
      description={(isFixed: boolean) => (
        <CategoryDescription
          categoryKey="categories"
          category={category ?? null}
          size={isFixed ? 'md' : 'lg'}
          isLoading={isLoading}
        />
      )}
      isLoading={isLoading}
      favouriteType={'categories'}
      name={category?.name ?? null}
      displayName={
        category?.name ? t(`categories.${category?.name ?? ''}`) : null
      }
    />
  );
}
