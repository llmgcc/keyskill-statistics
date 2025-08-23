import { placeholderData, skillName } from '@/utils/common';
import { useMemo } from 'react';
import { ColumnDef, OnChangeFn, PaginationState } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Category, KeySkill, OrderBy } from '@/interfaces';
import { useFavoriteDomains } from '@/hooks/data/useFavoriteDomains';
import { useFilters } from '@/hooks/useFilters';
import { usePaginationState } from '@/hooks/usePaginationState';
import {
  categoryImageAccessor,
  categoryNameAccessor,
  complexityAccessor,
  countAccessor,
  domainChartAccessor,
  domainSalaryAccessor,
  favoriteAccessor,
  placeAccessor,
  prevPlaceAccessor,
} from '@/components/Table/accessors';
import { DataTable } from '@/components/Table/DataTable';
import { PageSize } from '@/components/Table/PageSize';

interface FavoriteDomainsProps {
  order_by: OrderBy;
}

export function FavoriteDomains({ order_by }: FavoriteDomainsProps) {
  const { period, experience } = useFilters();
  const navigate = useNavigate();
  const { pagination, setPagination, pageSizeVariants } = usePaginationState(
    0,
    [10, 25, 50],
    JSON.stringify([period, order_by, experience]),
    'domains'
  );
  const { favoriteDomains, isLoading, isFetching, rows } = useFavoriteDomains(
    pagination,
    order_by
  );
  const { t, i18n } = useTranslation();

  const tableColumns = useMemo(
    () =>
      [
        favoriteAccessor({
          accessorKey: 'favorite_domain',
          isLoading: isLoading || isFetching,
          displayName: (skill: KeySkill) => skillName(skill, i18n.language),
          favoriteType: 'domains',
        }),
        placeAccessor({ accessorKey: 'place' }),
        prevPlaceAccessor({ accessorKey: 'prev_place' }),
        categoryImageAccessor({ accessorKey: 'image', category: 'domains' }),
        categoryNameAccessor({
          accessorKey: 'name',
          header: t('columns.name'),
          category: 'domains',
        }),
        complexityAccessor({
          accessorKey: 'complexity',
          header: t('complexity.title'),
        }),
        domainSalaryAccessor({
          accessorKey: 'average_salary',
          header: t('columns.salary'),
          isLoading: isLoading || isFetching,
        }),
        countAccessor({ accessorKey: 'count', header: t('columns.mentions') }),
        domainChartAccessor({
          accessorKey: 'chart',
          header: t('columns.trend'),
          isLoading: isLoading || isFetching,
        }),
      ] as Array<ColumnDef<Category, unknown> & { accessorKey: string }>,
    [t, isLoading, isFetching, i18n]
  );

  return (
    <>
      <div className="my-1 flex items-center justify-between gap-4 overflow-auto">
        <div className="text-sm text-text-secondary">
          {t('favoritesPage.domains')}
        </div>
        <PageSize
          variants={pageSizeVariants}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
      <DataTable
        columns={tableColumns as Array<ColumnDef<Category, unknown>>}
        data={
          favoriteDomains ??
          (placeholderData(pagination.pageSize) as Category[])
        }
        isLoading={isLoading || !favoriteDomains}
        isFetching={isFetching}
        pinnedLeft={['favorite_domain', 'place', 'image']}
        minWidth={1150}
        pagination={pagination}
        setPagination={setPagination as OnChangeFn<PaginationState>}
        pageSizeVariants={pageSizeVariants}
        rows={rows ?? 0}
        onSelect={(rowData: Category) => {
          navigate(`/domains/${encodeURIComponent(rowData.name)}`);
        }}
      />
    </>
  );
}
