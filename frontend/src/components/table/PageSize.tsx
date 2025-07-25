import { PaginationState } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { AppSelect } from '../ui/AppSelect';

interface PageSizeProps {
  pagination: PaginationState;
  variants: number[];
  setPagination: (pagination: PaginationState) => void;
}

export function PageSize({
  pagination,
  setPagination,
  variants,
}: PageSizeProps) {
  const { t } = useTranslation();
  return (
    <AppSelect
      value={String(pagination.pageSize)}
      options={variants.map(e => String(e))}
      onValueChange={details =>
        setPagination({
          ...pagination,
          pageSize: Number(details?.value?.[0] ?? variants[0]),
        })
      }
      triggerFormatter={() => (
        <div className="flex min-w-max items-center gap-1">
          <span className="text-sm text-text-primary">
            {t('pagination.show')}
          </span>
          <span className="text-sm text-text-secondary">
            {pagination.pageSize}
          </span>
        </div>
      )}
      valueFormatter={e => (
        <div className="flex">
          <div className="mr-1 text-text-primary">{e}</div>
        </div>
      )}
    />
  );
}
