import { useState } from 'react';
import { API } from '@/api/api';
import { KeySkill } from '@/interfaces';
import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { ColumnDef, PaginationState } from '@tanstack/react-table';

import { useSkills } from '@/hooks/useSkills';
import { TanTable } from '@/components/table/TanTable';

import {
  chartAccessor,
  countAccessor,
  placeAccessor,
  prevCountAccessor,
  prevPlaceAccessor,
  salaryAccessor,
  skillNameAccessor,
} from './accessors';

function KeySkills() {
  const { selectedPeriod } = usePeriodStore();
  const { selectedExperience } = useExperienceStore();

  const pageSizeVariants = [25, 50, 100];

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSizeVariants[0],
  });

  const {
    data: skillsData,
    isLoading,
    isFetching,
  } = useSkills({
    limit: pagination.pageSize,
    offset: pagination.pageSize * pagination.pageIndex,
    period: selectedPeriod,
    experience: selectedExperience,
  });

  const columns = [
    placeAccessor({ accessorKey: 'place' }),
    prevPlaceAccessor({ accessorKey: 'prev_place' }),
    skillNameAccessor({ accessorKey: 'name' }),
    salaryAccessor({
      accessorKey: 'average_salary',
      isLoading: isLoading || isFetching,
      selectedPeriod: selectedPeriod,
      selectedExperience: selectedExperience,
      key: 'skills_salary',
      source: API.salaryPlot,
    }),
    countAccessor({ accessorKey: 'count' }),
    prevCountAccessor({ accessorKey: 'prev_count' }),
    chartAccessor({
      accessorKey: 'chart',
      isLoading: isLoading || isFetching,
      selectedPeriod: selectedPeriod,
      selectedExperience: selectedExperience ?? undefined,
      key: 'skills_plot',
      source: API.skillPlot,
    }),
  ] as Array<ColumnDef<KeySkill, unknown>>;

  const totalRows = skillsData?.rows || 0;

  const empty: KeySkill = {
    place: 100,
    name: ' '.repeat(10),
    count: 100,
    prev_count: 200,
    prev_place: 200,
    average_salary: 100,
    categories: [],
    technologies: [],
  };
  const fillData = [];
  for (let i = 0; i < pagination.pageSize; i++) {
    fillData.push(empty);
  }

  return (
    <TanTable
      columns={columns}
      data={skillsData?.skills ?? fillData}
      onPaginationChange={setPagination}
      manualPagination={true}
      totalPages={totalRows}
      pagination={pagination}
      isLoading={isLoading || isFetching}
      isFetching={isFetching}
      pageSizeVariants={pageSizeVariants}
      onPageSizeChange={(pageSize) => {
        setPagination((prev) => ({
          ...prev,
          pageSize: pageSize,
        }));
      }}
    />
  );
}

export default KeySkills;
