import { placeholderData } from '@/utils/common';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
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

interface SimilarSkillsProps {
  name: string | null;
  order_by?: { order_by: string; descending: boolean };
}

export function SimilarSkills({ name, order_by }: SimilarSkillsProps) {
  const { t } = useTranslation();

  const { similarSkills, isFetching, isLoading } = useSimilarSkills(
    name,
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
        }),
        countAccessor({ accessorKey: 'count', header: t('columns.mentions') }),
        chartAccessor({
          accessorKey: 'chart',
          header: t('columns.trend'),
        }),
      ] as Array<ColumnDef<KeySkill, unknown>>,
    [t]
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
      />
    </div>
  );
}
