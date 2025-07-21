import { API } from '@/api/api';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { KeySkill } from '@/interfaces';
import { useRelatedSkills } from '@/hooks/data/useRelatedSkills';
import { useFilters } from '@/hooks/useFilters';
import { DataTable } from '@/components/Table/DataTable';
import {
  //   chartAccessor,
  countAccessor,
  placeAccessor,
  salaryAccessor,
  skillNameAccessor,
} from '@/components/Tabs/accessors';

interface RelatedSkillsProps {
  name: string | null;
  order_by?: { order_by: string; descending: boolean };
}

export function RelatedSkills({ name, order_by }: RelatedSkillsProps) {
  const { t } = useTranslation();

  const { period, experience } = useFilters();

  const { relatedSkills, isFetching, isLoading } = useRelatedSkills(
    name,
    order_by
  );

  const columns = useMemo(
    () =>
      [
        placeAccessor({ accessorKey: 'place' }),
        skillNameAccessor({ accessorKey: 'name', header: t('columns.name') }),
        salaryAccessor({
          accessorKey: 'average_salary',
          isLoading: isLoading || isFetching,
          selectedPeriod: period,
          selectedExperience: experience,
          key: 'skills_salary',
          source: API.salaryPlot,
          header: t('columns.salary'),
        }),
        countAccessor({ accessorKey: 'count', header: t('columns.mentions') }),
        // chartAccessor({
        //   accessorKey: 'chart',
        //   isLoading: isLoading || isFetching,
        //   selectedPeriod: period,
        //   selectedExperience: experience ?? undefined,
        //   key: 'skills_plot',
        //   source: API.skillPlot,
        //   header: t('columns.trend'),
        // }),
      ] as Array<ColumnDef<KeySkill, unknown>>,
    [t, period, experience, isLoading, isFetching]
  );

  return (
    <div>
      <div className="mb-2 text-sm text-text-secondary">
        {t(`skillPage.relatedSkills.subtitle`)}
      </div>

      <DataTable
        columns={columns}
        data={relatedSkills ?? []}
        isLoading={isLoading || isFetching}
      />
    </div>
  );
}
