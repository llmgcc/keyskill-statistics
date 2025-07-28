import { placeholderData } from '@/utils/common';
import { useMemo } from 'react';
import { ColumnDef, OnChangeFn, PaginationState } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { KeySkill } from '@/interfaces';
import { useRelatedSkills } from '@/hooks/data/useRelatedSkills';
import { useFilters } from '@/hooks/useFilters';
import { usePaginationState } from '@/hooks/usePaginationState';
import { DataTable } from '@/components/Table/DataTable';
import { PageSize } from '@/components/Table/PageSize';
import {
  chartAccessor,
  countAccessor,
  placeAccessor,
  salaryAccessor,
  skillImageAccessor,
  skillNameAccessor,
} from '@/components/Tabs/accessors';

interface RelatedSkillsProps {
  name: string | null;
  order_by?: { order_by: string; descending: boolean };
}

export function RelatedSkills({ name, order_by }: RelatedSkillsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { period, experience } = useFilters();
  const { pagination, setPagination, pageSizeVariants } = usePaginationState(
    0,
    [10, 25, 50],
    name ? JSON.stringify([name, period, order_by, experience]) : null
  );

  const { relatedSkills, isFetching, isLoading, rows } = useRelatedSkills(
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
        salaryAccessor({
          accessorKey: 'average_salary',
          header: t('columns.salary'),
          relatedTo: name,
          isLoading: isLoading || isFetching,
        }),
        countAccessor({ accessorKey: 'count', header: t('columns.mentions') }),
        chartAccessor({
          accessorKey: 'chart',
          header: t('columns.trend'),
          relatedTo: name,
          isLoading: isLoading || isFetching,
        }),
      ] as Array<ColumnDef<KeySkill, unknown>>,
    [t, name, isLoading, isFetching]
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="mb-2 text-sm text-text-secondary">
          {t(`skillPage.relatedSkills.subtitle`)}
        </div>
        <PageSize
          variants={pageSizeVariants}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
      <DataTable
        columns={columns}
        data={relatedSkills ?? placeholderData(10)}
        isLoading={isLoading || !relatedSkills}
        isFetching={isFetching || !name}
        pinnedLeft={['place', 'image']}
        minWidth={900}
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
