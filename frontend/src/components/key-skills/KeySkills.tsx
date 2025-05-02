import { useState } from 'react';
import { API } from '@/api/api';
import { KeySkill } from '@/interfaces';
import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { Skeleton } from '@radix-ui/themes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  ColumnDef,
  createColumnHelper,
  PaginationState,
  sortingFns,
} from '@tanstack/react-table';
import { GoDiff } from 'react-icons/go';
import { MdOutlineFiberNew } from 'react-icons/md';

import { Experience } from '@/config/experience';
import SkillDescription from '@/components/ui/SkillDescription';
import { TanTable } from '@/components/table/TanTable';

import { SkillHist } from '../plot/Hist';
import { SkillPlot } from '../plot/Plot';
import { CountRenderer } from '../table/renderers/CountRenderer';
import { SalaryRenderer } from '../table/renderers/SalaryRenderer';
import { ValueChangeRenderer } from '../table/renderers/ValueChangeRenderer';
import {
  countAccessor,
  placeAccessor,
  prevPlaceAccessor,
  salaryAccessor,
  skillNameAccessor,
} from './accessors';
import { getPercentDifference } from '@/utils/common';

type Category = {
  name: string;
  confidence: number;
};


type TableData = {
  skills: KeySkill[];
  count_bins: number;
  salary_bins: number;
  max_salary: number;
  rows: number;
};

interface UseSkillsOptions {
  limit: number;
  offset: number;
  days_period: number;
  experience: Experience;
}

function useSkills({
  limit,
  offset,
  days_period,
  experience,
}: UseSkillsOptions) {
  return useQuery({
    queryKey: ['skills', limit, offset, days_period, experience],
    queryFn: async () => {
      const data = await API.skillsList(
        limit,
        offset,
        days_period,
        experience == Experience.any ? undefined : (experience ?? undefined),
      );

      return {
        skills: data.skills,
        count_bins: 1,
        salary_bins: 1,
        max_salary: 1,
        rows: data.rows,
      };
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });
}

function KeySkills() {
  // const [skills, setSkills] = useState<TableData | null>(null);
  const { selectedPeriod } = usePeriodStore();
  const { selectedExperience } = useExperienceStore();
  const columnHelper = createColumnHelper<KeySkill>();

  const pageSizeVariants = [25, 50, 100];

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSizeVariants[0],
  });

  const {
    data: skillsData,
    isLoading,
    isFetching,
    error,
  } = useSkills({
    limit: pagination.pageSize,
    offset: pagination.pageSize * pagination.pageIndex,
    days_period: selectedPeriod,
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
    columnHelper.accessor('prev_count', {
      header: () => <GoDiff className="stroke-1" />,
      sortingFn: (rowa, rowb) => {
        const a = getPercentDifference(
          rowa.original.count,
          rowa.original.prev_count,
        );
        const b = getPercentDifference(
          rowb.original.count,
          rowb.original.prev_count,
        );
        if (rowa.original.prev_place && rowb.original.prev_place) {
          return a < b ? 1 : a > b ? -1 : 0;
        }
        if (!rowa.original.prev_place) {
          return 1;
        }
        if (!rowb.original.prev_place) {
          return -1;
        }
        return 0;
      },
      cell: (info) => {
        const current = info.row.original.count;
        const prev = info.row.original.prev_count;
        const difference =
          info.row.original.count - info.row.original.prev_count;
        let className = 'text-yellow-400';
        if (difference < 0 && Number.isInteger(info.row.original.prev_count)) {
          className = 'text-red-500';
        } else {
          className = 'text-green-400';
        }
        return (
          <div>
            <ValueChangeRenderer current={info.row.original.count} prev={info.row.original.prev_count} percent={true}/>
          </div>
        );
      },
      size: 100,
      meta: {
        alignRight: true,
      },
    }),
    columnHelper.accessor('chart', {
      header: 'Trend',
      cell: (info) => {
        const color =
          info.row.original.count >= info.row.original.prev_count
            ? 'rgb(74, 222, 128)'
            : 'rgb(239, 68, 68)';
        return (
          <div style={{ height: '40px' }} className="w-40">
            <div className="size-full">
              <Skeleton loading={isLoading || isFetching} className="size-full">
                {(!isLoading || !isFetching) && (
                  <SkillPlot
                    name={info.row.original.name}
                    key="skills_plot"
                    source={API.skillPlot}
                    period={selectedPeriod}
                    color={color}
                    strokeWidth={2}
                    experience={selectedExperience}
                  />
                )}
              </Skeleton>
            </div>
          </div>
        );
      },
      size: 150,
      enableSorting: false,
      meta: {
        alignRight: true,
      },
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
