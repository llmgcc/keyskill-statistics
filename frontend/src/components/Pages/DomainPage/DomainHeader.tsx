import { useTranslation } from 'react-i18next';

import { Category } from '@/interfaces';
import { CategoryDescription } from '@/components/ui/Description/CategoryDescription';

import { Header } from '../Common/Header';

interface DomainHeaderProps {
  domain?: Category;
  isLoading: boolean;
}

export function DomainHeader({ domain, isLoading }: DomainHeaderProps) {
  const { t } = useTranslation();
  return (
    <Header
      description={(isFixed: boolean) => (
        <CategoryDescription
          categoryKey="domains"
          category={domain ?? null}
          size={isFixed ? 'md' : 'lg'}
          isLoading={isLoading}
        />
      )}
      isLoading={isLoading}
      favouriteType={'domains'}
      name={domain?.name ?? null}
      displayName={domain?.name ? t(`domains.${domain?.name ?? ''}`) : null}
    />
  );
}
