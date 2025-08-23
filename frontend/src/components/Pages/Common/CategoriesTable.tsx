import { placeholderData } from '@/utils/common';
import { useEffect, useMemo } from 'react';
import { ColumnDef, OnChangeFn, PaginationState } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Category, CategoryFilter, KeySkill, OrderBy } from '@/interfaces';
import { useCategories } from '@/hooks/data/useCategories';
import { useFilters } from '@/hooks/useFilters';
import { usePaginationState } from '@/hooks/usePaginationState';
import {
  categoryChartAccessor,
  categoryImageAccessor,
  categoryNameAccessor,
  categorySalaryAccessor,
  complexityAccessor,
  countAccessor,
  favoriteAccessor,
  placeAccessor,
  prevPlaceAccessor,
} from '@/components/Table/accessors';
import { DataTable } from '@/components/Table/DataTable';
import { PageSize } from '@/components/Table/PageSize';

interface SkillsTableProps {
  columns?: string[];
  order_by?: OrderBy;
  filter?: CategoryFilter;
  enabled?: boolean;
  paginationPrefix?: string;
  width?: number;
  text?: string | JSX.Element;
  pageSizes?: number[];
  onRowsChange?: (rows: number) => void;
}

const DEAFULT_COLUMNS = [
  'place',
  'image',
  'name',
  'average_salary',
  'count',
  'chart',
];

const DEFAULT_PAGE_SIZE_VARIANTS = [10, 25, 50];

export function CategoriesTable({
  order_by,
  filter,
  columns = DEAFULT_COLUMNS,
  enabled = false,
  paginationPrefix,
  width = 1200,
  text = '',
  pageSizes = DEFAULT_PAGE_SIZE_VARIANTS,
  onRowsChange,
}: SkillsTableProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { period, experience } = useFilters();
  const { pagination, setPagination, pageSizeVariants } = usePaginationState(
    0,
    pageSizes,
    enabled ? JSON.stringify([period, order_by, experience]) : null,
    paginationPrefix
  );

  const { categories, isFetching, isLoading, rows } = useCategories(
    pagination,
    order_by,
    filter,
    enabled
  );

  useEffect(() => {
    if (rows !== undefined && onRowsChange) {
      onRowsChange(rows);
    }
  }, [rows, onRowsChange]);

  const tableColumns = useMemo(
    () =>
      [
        favoriteAccessor({
          accessorKey: 'favorite_category',
          isLoading: isLoading || isFetching,
          displayName: (skill: KeySkill) => t(`categories.${skill.name}`),
          favoriteType: 'categories',
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
          isLoading: isLoading || isFetching || !enabled,
        }),
        countAccessor({ accessorKey: 'count', header: t('columns.mentions') }),
        categoryChartAccessor({
          accessorKey: 'chart',
          header: t('columns.trend'),
          isLoading: isLoading || isFetching || !enabled,
        }),
      ] as Array<ColumnDef<Category, unknown> & { accessorKey: string }>,
    [t, isLoading, isFetching, enabled]
  );

  const cols = columns
    .map(column => tableColumns.find(c => c.accessorKey === column))
    .filter(e => e);

  return (
    <>
      <div className="my-1 flex items-center justify-between gap-4 overflow-auto">
        <div className="text-sm text-text-secondary">{text}</div>
        <PageSize
          variants={pageSizeVariants}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
      <DataTable
        columns={cols as ColumnDef<Category>[]}
        data={
          categories ?? (placeholderData(pagination.pageSize) as Category[])
        }
        isLoading={isLoading || !categories}
        isFetching={isFetching || !enabled}
        pinnedLeft={['favorite_category', 'place', 'image']}
        minWidth={width}
        pagination={pagination}
        setPagination={setPagination as OnChangeFn<PaginationState>}
        pageSizeVariants={pageSizeVariants}
        rows={rows ?? 0}
        onSelect={(rowData: Category) => {
          navigate(`/category/${encodeURIComponent(rowData.name)}`);
        }}
      />
    </>
  );
}
