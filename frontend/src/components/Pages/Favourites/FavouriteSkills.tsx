import { placeholderData, skillName } from '@/utils/common';
import { useMemo } from 'react';
import { ColumnDef, OnChangeFn, PaginationState } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { KeySkill, ServerOrderBy } from '@/interfaces';
import { useFavouriteSkills } from '@/hooks/data/useFavouriteSkills';
import { useFilters } from '@/hooks/useFilters';
import { usePaginationState } from '@/hooks/usePaginationState';
import { DataTable } from '@/components/Table/DataTable';
import { PageSize } from '@/components/Table/PageSize';
import {
  chartAccessor,
  complexityAccessor,
  countAccessor,
  favouriteAccessor,
  placeAccessor,
  prevPlaceAccessor,
  salaryAccessor,
  skillImageAccessor,
  skillNameAccessor,
} from '@/components/Tabs/accessors';

interface FavouriteSkillsProps {
  order_by?: ServerOrderBy;
}

export function FavouriteSkills({ order_by }: FavouriteSkillsProps) {
  const { period, experience } = useFilters();
  const navigate = useNavigate();
  const { pagination, setPagination, pageSizeVariants } = usePaginationState(
    0,
    [10, 25, 50],
    JSON.stringify([period, order_by, experience]),
    'skills'
  );
  const { favouriteSkills, isLoading, isFetching, rows } = useFavouriteSkills(
    pagination,
    order_by
  );
  const { t, i18n } = useTranslation();

  const tableColumns = useMemo(
    () =>
      [
        favouriteAccessor({
          accessorKey: 'favourite_skill',
          isLoading: isLoading || isFetching,
          displayName: (skill: KeySkill) => skillName(skill, i18n.language),
          favouriteType: 'skills',
        }),
        placeAccessor({ accessorKey: 'place' }),
        prevPlaceAccessor({ accessorKey: 'prev_place' }),
        skillImageAccessor({ accessorKey: 'image' }),
        skillNameAccessor({ accessorKey: 'name', header: t('columns.name') }),

        complexityAccessor({
          accessorKey: 'complexity',
          header: t('complexity.title'),
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
      ] as Array<ColumnDef<KeySkill, unknown> & { accessorKey: string }>,
    [t, isLoading, isFetching, i18n]
  );

  return (
    <>
      <div className="my-1 flex items-center justify-between gap-4 overflow-auto">
        <div className="text-sm text-text-secondary">
          {t('favouritesPage.skills')}
        </div>
        <PageSize
          variants={pageSizeVariants}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
      <DataTable
        columns={tableColumns as Array<ColumnDef<KeySkill, unknown>>}
        data={favouriteSkills ?? placeholderData(pagination.pageSize)}
        isLoading={isLoading || !favouriteSkills}
        isFetching={isFetching}
        pinnedLeft={['favourite_skill', 'place', 'image']}
        minWidth={1150}
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
