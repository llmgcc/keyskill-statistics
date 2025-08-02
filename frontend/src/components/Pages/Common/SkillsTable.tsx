import { placeholderData } from '@/utils/common';
import { useMemo } from 'react';
import { ColumnDef, OnChangeFn, PaginationState } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { KeySkill, ServerFilters, ServerOrderBy } from '@/interfaces';
import { useFilters } from '@/hooks/useFilters';
import { usePaginationState } from '@/hooks/usePaginationState';
import { useSkills } from '@/hooks/useSkills';
import { DataTable } from '@/components/Table/DataTable';
import { PageSize } from '@/components/Table/PageSize';
import {
  chartAccessor,
  countAccessor,
  placeAccessor,
  salaryAccessor,
  similarityAccessor,
  skillImageAccessor,
  skillNameAccessor,
} from '@/components/Tabs/accessors';

interface SkillsTableProps {
  columns?: string[];
  order_by?: ServerOrderBy;
  filter?: ServerFilters;
  enabled?: boolean;
  paginationPrefix?: string;
  width?: number;
  text?: string;
}

const DEAFULT_COLUMNS = [
  'place',
  'image',
  'name',
  'average_salary',
  'count',
  'chart',
];

export function SkillsTable({
  order_by,
  filter,
  columns = DEAFULT_COLUMNS,
  enabled = false,
  paginationPrefix,
  width = 1200,
  text = '',
}: SkillsTableProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { period, experience } = useFilters();
  const { pagination, setPagination, pageSizeVariants } = usePaginationState(
    0,
    [10, 25, 50],
    enabled ? JSON.stringify([period, order_by, experience]) : null,
    paginationPrefix
  );

  const { skills, isFetching, isLoading, rows } = useSkills(
    pagination,
    order_by,
    filter,
    enabled
  );

  const tableColumns = useMemo(
    () =>
      [
        placeAccessor({ accessorKey: 'place' }),
        skillImageAccessor({ accessorKey: 'image' }),
        skillNameAccessor({ accessorKey: 'name', header: t('columns.name') }),
        similarityAccessor({
          accessorKey: 'similarity_score',
          header: t('columns.similarity'),
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
      ] as Array<ColumnDef<KeySkill, unknown> & { accessorKey: string }>,
    [t, isLoading, isFetching, enabled]
  );

  const cols = columns
    .map(column => tableColumns.find(c => c.accessorKey === column))
    .filter(e => e);

  return (
    <>
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <div className="mb-2 text-sm text-text-secondary">{text}</div>
        <PageSize
          variants={pageSizeVariants}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
      <DataTable
        columns={cols as Array<ColumnDef<KeySkill, unknown>>}
        data={skills ?? placeholderData(10)}
        isLoading={isLoading || !skills}
        isFetching={isFetching || !enabled}
        pinnedLeft={['place', 'image']}
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
