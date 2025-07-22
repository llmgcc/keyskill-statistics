import { placeholderData } from '@/utils/common';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { KeySkill } from '@/interfaces';
import { useRelatedSkills } from '@/hooks/data/useRelatedSkills';
import { DataTable } from '@/components/Table/DataTable';
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

  const { relatedSkills, isFetching, isLoading } = useRelatedSkills(
    name,
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
        }),
        countAccessor({ accessorKey: 'count', header: t('columns.mentions') }),
        chartAccessor({
          accessorKey: 'chart',
          header: t('columns.trend'),
          relatedTo: name,
        }),
      ] as Array<ColumnDef<KeySkill, unknown>>,
    [t, name]
  );

  return (
    <>
      <div className="mb-2 text-sm text-text-secondary">
        {t(`skillPage.relatedSkills.subtitle`)}
      </div>
      <DataTable
        columns={columns}
        data={relatedSkills ?? placeholderData(10)}
        isLoading={isLoading || !relatedSkills}
        isFetching={isFetching || !name}
        pinnedLeft={['place', 'image']}
        minWidth={900}
      />
    </>
  );
}
