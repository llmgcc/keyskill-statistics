import { placeholderData, skillName } from '@/utils/common';
import { useMemo } from 'react';
import { ColumnDef, OnChangeFn, PaginationState } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { KeySkill, ServerOrderBy } from '@/interfaces';
import { useFavouriteCategories } from '@/hooks/data/useFavouriteCategories';
import { useFilters } from '@/hooks/useFilters';
import { usePaginationState } from '@/hooks/usePaginationState';
import { DataTable } from '@/components/Table/DataTable';
import { PageSize } from '@/components/Table/PageSize';
import {
  categoryChartAccessor,
  categoryImageAccessor,
  categoryNameAccessor,
  categorySalaryAccessor,
  complexityAccessor,
  countAccessor,
  favouriteAccessor,
  placeAccessor,
  prevPlaceAccessor,
} from '@/components/Tabs/accessors';

interface FavouriteCategoriesProps {
  order_by?: ServerOrderBy;
}

export function FavouriteCategories({ order_by }: FavouriteCategoriesProps) {
  const { period, experience } = useFilters();
  const navigate = useNavigate();
  const { pagination, setPagination, pageSizeVariants } = usePaginationState(
    0,
    [10, 25, 50],
    JSON.stringify([period, order_by, experience]),
    'categories'
  );
  const { favouriteCategories, isLoading, isFetching, rows } =
    useFavouriteCategories(pagination, order_by);
  const { t, i18n } = useTranslation();

  const tableColumns = useMemo(
    () =>
      [
        favouriteAccessor({
          accessorKey: 'favourite_category',
          isLoading: isLoading || isFetching,
          displayName: (skill: KeySkill) => skillName(skill, i18n.language),
          favouriteType: 'categories',
        }),
        placeAccessor({ accessorKey: 'place' }),
        prevPlaceAccessor({ accessorKey: 'prev_place' }),
        categoryImageAccessor({ accessorKey: 'image', category: 'categories' }),
        categoryNameAccessor({
          accessorKey: 'name',
          header: t('columns.name'),
          category: 'categories',
        }),
        complexityAccessor({
          accessorKey: 'complexity',
          header: t('complexity.title'),
        }),
        categorySalaryAccessor({
          accessorKey: 'average_salary',
          header: t('columns.salary'),
          isLoading: isLoading || isFetching,
        }),
        countAccessor({ accessorKey: 'count', header: t('columns.mentions') }),
        categoryChartAccessor({
          accessorKey: 'chart',
          header: t('columns.trend'),
          isLoading: isLoading || isFetching,
        }),
      ] as Array<ColumnDef<KeySkill, unknown> & { accessorKey: string }>,
    [t, isLoading, isFetching, i18n]
  );

  return (
    <>
      <div className="my-1 flex items-center justify-between gap-4 overflow-auto">
        <div className="text-sm text-text-secondary">
          {t('favouritesPage.categories')}
        </div>
        <PageSize
          variants={pageSizeVariants}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
      <DataTable
        columns={tableColumns as Array<ColumnDef<KeySkill, unknown>>}
        data={favouriteCategories ?? placeholderData(pagination.pageSize)}
        isLoading={isLoading || !favouriteCategories}
        isFetching={isFetching}
        pinnedLeft={['favourite_category', 'place', 'image']}
        minWidth={1150}
        pagination={pagination}
        setPagination={setPagination as OnChangeFn<PaginationState>}
        pageSizeVariants={pageSizeVariants}
        rows={rows ?? 0}
        onSelect={(rowData: KeySkill) => {
          navigate(`/categories/${encodeURIComponent(rowData.name)}`);
        }}
      />
    </>
  );
}
