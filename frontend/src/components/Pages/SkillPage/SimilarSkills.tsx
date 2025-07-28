import { placeholderData } from '@/utils/common';
import { useMemo } from 'react';
import { ColumnDef, OnChangeFn, PaginationState } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { KeySkill } from '@/interfaces';
import { useSimilarSkills } from '@/hooks/data/useSimilarSkills';
import { DataTable } from '@/components/Table/DataTable';
import {
  chartAccessor,
  countAccessor,
  placeAccessor,
  salaryAccessor,
  similarityAccessor,
  skillImageAccessor,
  skillNameAccessor,
} from '@/components/Tabs/accessors';
import { useFilters } from '@/hooks/useFilters';
import { usePaginationState } from '@/hooks/usePaginationState';

interface SimilarSkillsProps {
  name: string | null;
  order_by?: { order_by: string; descending: boolean };
}

export function SimilarSkills({ name, order_by }: SimilarSkillsProps) {
  const { t } = useTranslation();


  const { period, experience } = useFilters();
  const { pagination, setPagination, pageSizeVariants } = usePaginationState(
    0,
    [10, 25, 50],
    name ? JSON.stringify([name, period, order_by, experience]) : null
  );

  const { similarSkills, isFetching, isLoading, rows } = useSimilarSkills(
    name,
    pagination,
    order_by
  );

  const columns = useMemo(
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
          isLoading: isLoading || isFetching,
        }),
        countAccessor({ accessorKey: 'count', header: t('columns.mentions') }),
        chartAccessor({
          accessorKey: 'chart',
          header: t('columns.trend'),
          isLoading: isLoading || isFetching,
        }),
      ] as Array<ColumnDef<KeySkill, unknown>>,
    [t, isLoading, isFetching]
  );

  return (
    <div>
      <div className="mb-2 text-sm text-text-secondary">
        {t(`skillPage.similarSkills.subtitle`)}
      </div>

      <DataTable
        columns={columns}
        data={similarSkills ?? placeholderData(10)}
        isLoading={isLoading || !similarSkills}
        isFetching={isFetching || !name}
        pinnedLeft={['place', 'image']}
        minWidth={1050}
        pagination={pagination}
        setPagination={setPagination as OnChangeFn<PaginationState>}
        pageSizeVariants={pageSizeVariants}
        rows={rows ?? 0}
        onSelect={(rowData: KeySkill) => {
          navigate(`/skill/${encodeURIComponent(rowData.name)}`);
        }}
      />
    </div>
  );
}
