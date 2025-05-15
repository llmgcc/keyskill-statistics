import { API } from '@/api/api';
import { Category } from '@/interfaces';
import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { ColumnDef } from '@tanstack/react-table';

import { useDomains } from '@/hooks/useDomains';

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

export function CategoriesTable() {
  const { selectedPeriod } = usePeriodStore();
  const { selectedExperience } = useExperienceStore();

  const {
    data: domains,
    isLoading,
    isFetching,
  } = useDomains({ selectedPeriod, selectedExperience });

  const columns = [
    placeAccessor({ accessorKey: 'place' }),
    prevPlaceAccessor({ accessorKey: 'prev_place' }),
    categoryNameAccessor({ accessorKey: 'name', category: 'domain' }),
    salaryAccessor({
      accessorKey: 'average_salary',
      isLoading: isLoading || isFetching,
      selectedPeriod: selectedPeriod,
      selectedExperience: selectedExperience,
      key: 'categories_salary',
      source: API.categorySalaryPlot,
    }),
    countAccessor({ accessorKey: 'count', header: 'Unique skills' }),
    prevCountAccessor({ accessorKey: 'prev_count' }),
    chartAccessor({
      accessorKey: 'chart',
      isLoading: isLoading || isFetching,
      selectedPeriod: selectedPeriod,
      selectedExperience: selectedExperience ?? undefined,
      key: 'domains_plot',
      source: API.domainPlot,
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
        columns={columns as any}
        data={domains ?? fillData}
        isLoading={isLoading || isFetching}
      />
    </div>
  );
}
