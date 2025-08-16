import i18n from '@/i18n/i18n';
import { placeholderData, skillName } from '@/utils/common';
import { useEffect, useMemo } from 'react';
import { ColumnDef, OnChangeFn, PaginationState } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { KeySkill, OrderBy, ServerFilters, ServerOrderBy } from '@/interfaces';
import { Categories } from '@/config/categories';
import { Domains } from '@/config/domains';
import { useFilters } from '@/hooks/useFilters';
import { usePaginationState } from '@/hooks/usePaginationState';
import { useSkills } from '@/hooks/useSkills';
import { DataTable } from '@/components/Table/DataTable';
import { PageSize } from '@/components/Table/PageSize';
import {
  chartAccessor,
  complexityAccessor,
  confidenceAccessor,
  countAccessor,
  favoriteAccessor,
  placeAccessor,
  prevPlaceAccessor,
  salaryAccessor,
  similarityAccessor,
  skillImageAccessor,
  skillNameAccessor,
} from '@/components/Tabs/accessors';

interface SkillsTableProps {
  columns?: string[];
  order_by?: OrderBy;
  filter?: ServerFilters;
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

export function SkillsTable({
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

  const { skills, isFetching, isLoading, rows } = useSkills(
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
          accessorKey: 'favorite_skill',
          isLoading: isLoading || isFetching,
          displayName: (skill: KeySkill) => skillName(skill, i18n.language),
          favoriteType: 'skills',
        }),
        placeAccessor({ accessorKey: 'place' }),
        prevPlaceAccessor({ accessorKey: 'prev_place' }),
        skillImageAccessor({ accessorKey: 'image' }),
        skillNameAccessor({ accessorKey: 'name', header: t('columns.name') }),
        similarityAccessor({
          accessorKey: 'similarity_score',
          header: t('columns.similarity'),
        }),
        complexityAccessor({
          accessorKey: 'complexity',
          header: t('complexity.title'),
        }),
        salaryAccessor({
          accessorKey: 'average_salary',
          header: t('columns.salary'),
          isLoading: isLoading || isFetching || !enabled,
        }),
        countAccessor({ accessorKey: 'count', header: t('columns.mentions') }),
        chartAccessor({
          accessorKey: 'chart',
          header: t('columns.trend'),
          isLoading: isLoading || isFetching || !enabled,
        }),

        ...Object.keys(Domains).map(domain =>
          confidenceAccessor({
            accessorKey: `${domain}-confidence`,
            header: t('common.confidence'),
            name: domain,
            categoryKey: 'domains',
          })
        ),
        ...Object.keys(Categories).map(category =>
          confidenceAccessor({
            accessorKey: `${category}-confidence`,
            header: t('common.confidence'),
            name: category,
            categoryKey: 'categories',
          })
        ),
      ] as Array<ColumnDef<KeySkill, unknown> & { accessorKey: string }>,
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
        columns={cols as Array<ColumnDef<KeySkill, unknown>>}
        data={skills ?? placeholderData(pagination.pageSize)}
        isLoading={isLoading || !skills}
        isFetching={isFetching || !enabled}
        pinnedLeft={['favorite_skill', 'place', 'image']}
        minWidth={width}
        pagination={pagination}
        setPagination={setPagination as OnChangeFn<PaginationState>}
        pageSizeVariants={pageSizeVariants}
        rows={rows ?? 0}
        onSelect={(rowData: KeySkill) => {
          navigate(`/skill/${encodeURIComponent(rowData.name)}`);
        }}
      />
    </>
  );
}
