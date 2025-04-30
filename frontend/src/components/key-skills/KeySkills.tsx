import { useState } from 'react';
import { API } from '@/api/api';
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
import { ValueChangeRenderer } from '../table/renderers/ValueChangeRenderer';
import { placeAccessor, prevPlaceAccessor, skillNameAccessor } from './accessors';
import { KeySkill } from '@/interfaces';

type Category = {
  name: string;
  confidence: number;
};


function getPercentDifference(current: number, prev: number) {
  return ((current - prev) / prev) * 100;
}

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
        experience == Experience.any ? undefined : (experience ?? undefined),
        days_period,
        limit,
        offset,
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
    placeAccessor({accessorKey: 'place'}),
    prevPlaceAccessor({accessorKey: 'prev_place'}),
    skillNameAccessor({accessorKey: 'name'}),
    columnHelper.accessor('average_salary', {
      header: () => (
        <div className="flex items-center">
          <div className="mr-1">Salary</div>
        </div>
      ),
      cell: (info) => {
        const color = 'rgba(229, 231, 235)';
        const data: any[] = [];
        const salary = info.getValue();
        return (
          <div>
            <div className="flex justify-end text-text">
              {salary ? (
                <div className="z-40 font-[500]">
                  <>
                    <span className="">₽</span>
                    {Number(info.getValue()).toFixed(0)}
                  </>
                </div>
              ) : (
                <div>N/A</div>
              )}
            </div>

            <Skeleton loading={isLoading || isFetching} className="size-full">
              {/* {!isLoading && <SkillPlot name={info.row.original.name} period={selectedPeriod} color={color} strokeWidth={2}  />} */}
              {(!isLoading || !isFetching) && (
                <SkillHist
                  name={info.row.original.name}
                  key='skills_salary'
                  source={API.salaryPlot}
                  period={selectedPeriod}
                  color={color}
                  strokeWidth={2}
                  average={info.row.original.average_salary}
                  experience={selectedExperience}
                />
              )}
            </Skeleton>
          </div>
        );
      },
      size: 120,
      meta: {
        alignRight: true,
      },
    }),
    columnHelper.accessor('count', {
      cell: (info) => {
        const max = Math.max(
          ...info.table.getCenterRows().map((r) => r.original.count),
        );
        const width = (info.getValue() / max) * 100;
        return (
          <div className="relative">
            <div className="flex w-32 items-end justify-end font-[500]">
              {info.getValue()}
            </div>
            <div className="absolute bottom-[-10px] flex h-[4px] w-full rounded bg-gray-200 text-text">
              <div
                className={`rounded bg-gray-300`}
                style={{ width: `${Math.max(5, width)}%` }}
              ></div>
            </div>
          </div>
        );
      },
      header: () => (
        <div className="flex items-center">
          <div className="">Mentions</div>
        </div>
      ),
      size: 125,
      meta: {
        alignRight: true,
      },
    }),
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
          <div style={{ textAlign: 'left' }}>
            <div className={`${className} keyskills-badge`}>
              <div className="keyskills-badge-arrow"></div>
              <div className="keyskills-difference-value">
                {prev && current ? (
                  <div>
                    {getPercentDifference(
                      info.row.original.count,
                      info.row.original.prev_count,
                    ).toFixed(2)}
                    %
                  </div>
                ) : (
                  <div>
                    <MdOutlineFiberNew size={25} />
                  </div>
                )}
              </div>
            </div>
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
                    key='skills_plot'
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
    name: 'a'.repeat(20),
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
