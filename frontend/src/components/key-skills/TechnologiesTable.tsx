import { useEffect, useState } from 'react';
import { API } from '@/api/api';
import { useCategoriesStore } from '@/store/categoriesStore';
import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { Skeleton } from '@radix-ui/themes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  ColumnDef,
  createColumnHelper,
  sortingFns,
} from '@tanstack/react-table';
import axios from 'axios';
import { BiQuestionMark } from 'react-icons/bi';
import { GoDiff } from 'react-icons/go';
import { MdOutlineFiberNew } from 'react-icons/md';

import { Experience } from '@/config/experience';

import { SkillHist } from '../plot/Hist';
import { SkillPlot } from '../plot/Plot';
import { DataTable } from '../table/DataTable';
import { ValueChangeRenderer } from '../table/renderers/ValueChangeRenderer';
import { TanTable } from '../table/TanTable';
import SkillDescription from '../ui/SkillDescription';
import SkillImage from '../ui/SkillImage';
import {
  categoryNameAccessor,
  countAccessor,
  placeAccessor,
  prevPlaceAccessor,
  salaryAccessor,
} from './accessors';

type Category = {
  place: number;
  name: string;
  count: number;
  prev_place: number;
  prev_count: number;
  average_salary: number;
};

function getPercentDifference(current: number, prev: number) {
  return ((current - prev) / prev) * 100;
}

export function TechnologiesTable() {
  const { selectedPeriod } = usePeriodStore();
  const { selectedExperience } = useExperienceStore();
  const { categories: categoriesShort } = useCategoriesStore();
  const {
    data: categories,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['categories_list', selectedPeriod, selectedExperience],
    queryFn: async () => {
      const data = await API.categoriesList(
        selectedPeriod ?? 10,
        selectedExperience == Experience.any
          ? undefined
          : (selectedExperience ?? undefined),
      );
      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });
  // const [categories, setCategories] = useState<Category[] | null>(null);

  const columnHelper = createColumnHelper<Category>();

  const columns = [
    placeAccessor({ accessorKey: 'place' }),
    prevPlaceAccessor({ accessorKey: 'prev_place' }),
    categoryNameAccessor({ accessorKey: 'name', category: 'technology' }),

    salaryAccessor({
      accessorKey: 'average_salary',
      isLoading: isLoading || isFetching,
      selectedPeriod: selectedPeriod,
      selectedExperience: selectedExperience,
      key: 'technologies_salary',
      source: API.technologySalaryPlot,
    }),

    //  columnHelper.accessor('average_salary', {
    //       header: () => (
    //         <div className="flex items-center">
    //           <div className="mr-1">Salary</div>
    //         </div>
    //       ),
    //       cell: (info) => {
    //         const color = 'rgba(229, 231, 235)';
    //         const data: any[] = [];
    //         const salary = info.getValue();
    //         return (
    //           <div>
    //             <div className="flex justify-end text-text">
    //               {salary ? (
    //                 <div className="z-40 font-[500]">
    //                   <>
    //                     <span className="">₽</span>
    //                     {Number(info.getValue()).toFixed(0)}
    //                   </>
    //                 </div>
    //               ) : (
    //                 <div>N/A</div>
    //               )}
    //             </div>

    //             <Skeleton loading={isLoading || isFetching} className="size-full">
    //               {/* {!isLoading && <SkillPlot name={info.row.original.name} period={selectedPeriod} color={color} strokeWidth={2}  />} */}
    //               {(!isLoading || !isFetching) && (
    //                 <SkillHist
    //                   name={info.row.original.name}
    //                   key='technologies_salary'
    //                   source={API.technologySalaryPlot}
    //                   period={selectedPeriod}
    //                   color={color}
    //                   strokeWidth={2}
    //                   average={info.row.original.average_salary}
    //                   experience={selectedExperience}
    //                 />
    //               )}
    //             </Skeleton>
    //           </div>
    //         );
    //       },
    //       size: 120,
    //       meta: {
    //         alignRight: true,
    //       },
    //     }),

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
                    key="technology_plot"
                    source={API.technologyPlot}
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
  ] as Array<ColumnDef<Category, unknown>>;

  const empty: Category = {
    place: 100,
    name: ' '.repeat(10),
    count: 100,
    prev_count: 200,
    prev_place: 200,
    average_salary: 100,
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
