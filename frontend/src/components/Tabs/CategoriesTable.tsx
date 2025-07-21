import { API } from '@/api/api';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { Category } from '@/interfaces';
import { useDomains } from '@/hooks/useDomains';
import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';

import { DataTable } from '../Table/DataTable';
import {
  categoryNameAccessor,
  chartAccessor,
  countAccessor,
  placeAccessor,
  prevCountAccessor,
  prevPlaceAccessor,
  salaryAccessor,
} from './accessors';

export function CategoriesTable() {
  const { selectedPeriod } = usePeriodStore();
  const { selectedExperience } = useExperienceStore();
  const { t } = useTranslation();
  const {
    data: domains,
    isLoading,
    isFetching,
  } = useDomains({ selectedPeriod, selectedExperience });

  const columns = [
    placeAccessor({ accessorKey: 'place' }),
    prevPlaceAccessor({ accessorKey: 'prev_place' }),
    categoryNameAccessor({
      accessorKey: 'name',
      category: 'domains',
      header: t('columns.name'),
    }),
    salaryAccessor({
      accessorKey: 'average_salary',
      isLoading: isLoading || isFetching,
      selectedPeriod: selectedPeriod,
      selectedExperience: selectedExperience,
      key: 'categories_salary',
      source: API.categorySalaryPlot,
      header: t('columns.salary'),
    }),
    countAccessor({ accessorKey: 'count', header: t('columns.skills') }),
    prevCountAccessor({ accessorKey: 'prev_count' }),
    chartAccessor({
      accessorKey: 'chart',
      isLoading: isLoading || isFetching,
      selectedPeriod: selectedPeriod,
      selectedExperience: selectedExperience ?? undefined,
      key: 'domains_plot',
      source: API.domainPlot,
      header: t('columns.trend'),
    }),
  ] as Array<ColumnDef<Category, unknown>>;

  const empty: Category = {
    place: 100,
    name: ' '.repeat(10),
    count: 100,
    prev_count: 200,
    prev_place: 200,
    average_salary: 100,
    confidence: 0,
  };
  const fillData = [];
  for (let i = 0; i < 20; i++) {
    fillData.push(empty);
  }

  return (
    <div>
      <DataTable
        columns={columns}
        data={domains ?? fillData}
        isLoading={isLoading || isFetching}
      />
    </div>
  );
}
