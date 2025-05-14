import { useEffect, useMemo, useState } from 'react';
import { API } from '@/api/api';
import { KeySkill } from '@/interfaces';
import { SkillsOrderBy } from '@/interfaces/api';
import { useSkillFilter } from '@/providers/SkillFilterProvider';
import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import {
  ColumnDef,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { useDebounce } from '@/hooks/useDebounce';
import { useSkills } from '@/hooks/useSkills';

import { DataTable } from '../table/DataTable';
import {
  chartAccessor,
  confidenceAccessor,
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
  const { t } = useTranslation();
  const pageSizeVariants = [25, 50, 100];

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSizeVariants[0],
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const { filterState } = useSkillFilter();
  const debouncedFilterState = useDebounce(filterState, 500);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  }, [selectedPeriod, selectedExperience, debouncedFilterState, sorting]);

  const orderBy: SkillsOrderBy = {
    column: '',
    type: undefined,
    asc: true,
    category: undefined,
    domain: undefined,
  };

  if (sorting && sorting.length) {
    const tanColumn = sorting[0];
    if (tanColumn.id === 'category-confidence') {
      orderBy.type = tanColumn.id;
      orderBy.category = filterState.category.selected?.name;
    } else if (tanColumn.id === 'domain-confidence') {
      orderBy.type = tanColumn.id;
      orderBy.domain = filterState.domain.selected?.name;
    } else {
      orderBy.type = 'default';
      orderBy.column = tanColumn.id;
    }

    orderBy.asc = !tanColumn.desc;
  }

  const {
    data: skillsData,
    isLoading,
    isFetching,
  } = useSkills({
    limit: pagination.pageSize,
    offset: pagination.pageSize * pagination.pageIndex,
    period: selectedPeriod,
    experience: selectedExperience,
    category: debouncedFilterState?.category?.selected?.name,
    domain: debouncedFilterState?.domain?.selected?.name,
    categoryStrict: debouncedFilterState?.category?.strict,
    domainStrict: debouncedFilterState?.domain?.strict,
    skillName: debouncedFilterState?.skill,
    orderBy,
  });

  const columns = useMemo(
    () =>
      [
        placeAccessor({ accessorKey: 'place' }),
        prevPlaceAccessor({ accessorKey: 'prev_place' }),
        skillNameAccessor({ accessorKey: 'name' }),
        ...(filterState.domain?.selected
          ? [
              confidenceAccessor({
                accessorKey: 'domain-confidence',
                header: t(`domainsShort.${filterState.domain?.selected?.name}`),
                name: filterState.domain?.selected?.name,
                categoryKey: 'domains',
              }),
            ]
          : []),
        ...(filterState.category?.selected
          ? [
              confidenceAccessor({
                accessorKey: 'category-confidence',
                header: t(
                  `categoriesShort.${filterState.category?.selected?.name}`,
                ),
                name: filterState.category?.selected?.name,
                categoryKey: 'categories',
              }),
            ]
          : []),
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
      ] as Array<ColumnDef<KeySkill, unknown>>,
    [
      debouncedFilterState,
      t,
      selectedPeriod,
      selectedExperience,
      isLoading,
      isFetching,
      pagination,
    ],
  );

  const totalRows = skillsData?.rows || 0;

  const empty: KeySkill = {
    place: 100,
    name: ' '.repeat(10),
    count: 100,
    prev_count: 200,
    prev_place: 200,
    average_salary: 100,
    domains: [],
    categories: [],
  };
  const fillData = [];
  for (let i = 0; i < pagination.pageSize; i++) {
    fillData.push(empty);
  }

  const paginationState = {
    totalRows,
    pageSize: pagination.pageSize,
    pageIndex: pagination.pageIndex,
    onPageChange: (page: number, pageSize: number) =>
      setPagination({
        pageIndex: page,
        pageSize: pageSize,
      }),
    pages: pageSizeVariants,
  };

  const sortingState = {
    sorting,
    setSorting,
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={skillsData?.skills ?? fillData}
        isLoading={isLoading || isFetching}
        pagination={paginationState}
        sorting={sortingState}
      />
    </div>
  );
}

export default KeySkills;
