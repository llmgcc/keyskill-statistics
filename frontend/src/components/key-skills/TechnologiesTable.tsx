import { API } from '@/api/api';
import { Category } from '@/interfaces';
import { useCategoriesStore } from '@/store/categoriesStore';
import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { useCategories } from '@/hooks/useCategories';

import { DataTable } from '../table/DataTable';
import {
  categoryNameAccessor,
  chartAccessor,
  countAccessor,
  placeAccessor,
  prevCountAccessor,
  prevPlaceAccessor,
  salaryAccessor,
} from './accessors';

export function TechnologiesTable() {
  const { selectedPeriod } = usePeriodStore();
  const { selectedExperience } = useExperienceStore();
  const { categories: categoriesShort } = useCategoriesStore();
  const {
    data: categories,
    isLoading,
    isFetching,
  } = useCategories({ selectedPeriod, selectedExperience });
  const { t } = useTranslation();
  const columns = [
    placeAccessor({ accessorKey: 'place' }),
    prevPlaceAccessor({ accessorKey: 'prev_place' }),
    categoryNameAccessor({
      accessorKey: 'name',
      category: 'category',
      header: t('columns.name'),
    }),

    salaryAccessor({
      accessorKey: 'average_salary',
      isLoading: isLoading || isFetching,
      selectedPeriod: selectedPeriod,
      selectedExperience: selectedExperience,
      key: 'technologies_salary',
      source: API.technologySalaryPlot,
      header: t('columns.salary'),
    }),
    countAccessor({ accessorKey: 'count', header: t('columns.skills') }),
    prevCountAccessor({ accessorKey: 'prev_count' }),
    chartAccessor({
      accessorKey: 'chart',
      isLoading: isLoading || isFetching,
      selectedPeriod: selectedPeriod,
      selectedExperience: selectedExperience ?? undefined,
      key: 'categories_plot',
      source: API.technologyPlot,
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
    <DataTable
      columns={columns ?? fillData}
      data={categories ?? categoriesShort}
      isLoading={isLoading || isFetching}
    />
  );
}
