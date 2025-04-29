import { useEffect, useState } from 'react';
import {
  ColumnDef,
  createColumnHelper,
  sortingFns,
} from '@tanstack/react-table';
import axios from 'axios';
import { BiQuestionMark } from 'react-icons/bi';
import { GoDiff } from 'react-icons/go';
import { MdOutlineFiberNew } from 'react-icons/md';

import { ValueChangeRenderer } from '../table/renderers/ValueChangeRenderer';
import { TanTable } from '../table/TanTable';
import SkillDescription from '../ui/SkillDescription';
import SkillImage from '../ui/SkillImage';

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
  const [categories, setCategories] = useState<Category[] | null>(null);

  const columnHelper = createColumnHelper<Category>();

  const columns = [
    columnHelper.accessor('place', {
      cell: (info) => <div>{info.getValue()}</div>,
      header: () => <div>#</div>,
      size: 50,
      meta: {
        alignRight: true,
      },
    }),
    columnHelper.accessor('prev_place', {
      header: () => (
        <div>
          <GoDiff className="stroke-1" />
        </div>
      ),
      sortingFn: (rowa, rowb) => {
        const a = rowa.original.prev_place - rowa.original.place;
        const b = rowb.original.prev_place - rowb.original.place;
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
        const prev = info.row.original.prev_place;
        const current = info.row.original.place;
        return <ValueChangeRenderer prev={prev} current={current} />;
      },
      size: 50,
      meta: {
        alignRight: true,
      },
    }),
    columnHelper.accessor('name', {
      header: () => <div>Title</div>,
      sortingFn: sortingFns.alphanumeric,
      cell: (info) => {
        return (
          <div className="flex items-center">
            <div className="mr-2 flex aspect-square w-6 items-center justify-center">
              <SkillImage technology={info.row.original.name} />
            </div>
            <div className="text-sm font-bold">{info.row.original.name}</div>
          </div>
        );
      },
      size: 0,
    }),
    columnHelper.accessor('average_salary', {
      header: () => (
        <div className="flex items-center">
          <div className="mr-1">Salary</div>
          <div className="flex h-3 w-3 cursor-help items-center justify-center rounded-full bg-background-secondary">
            <BiQuestionMark />
          </div>
        </div>
      ),
      cell: (info) => {
        return (
          <div>
            <div className="z-40 flex justify-end text-text">
              <div className="z-40">₽{Number(info.getValue()).toFixed(0)}</div>
            </div>
            <div className="relative z-10">
              <div className="relative z-20 h-[2px] w-20 rounded bg-[#E0E0E0]">
                <div className="absolute left-5 z-20 flex h-full w-5 justify-center rounded bg-gray-600">
                  <div className="h-full w-[4px] rounded bg-gray-400"></div>
                </div>
                <div className="absolute left-2 z-10 h-full w-16 rounded bg-gray-400"></div>
              </div>
            </div>
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
          <div className="">
            <div className="flex w-20 items-end justify-end">
              {info.getValue()}
            </div>
            <div className="mx-2 flex h-[3px] w-full rounded bg-background-secondary text-text">
              <div
                className={`rounded bg-gray-400`}
                style={{ width: `${Math.max(5, width)}%` }}
              ></div>
            </div>
          </div>
        );
      },
      header: () => (
        <div className="flex items-center">
          <div className="">Count</div>
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
          className = 'text-red-400';
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
  ] as Array<ColumnDef<Category, unknown>>;

  useEffect(() => {
    axios.get('/api/technologies/list').then((response) => {
      setCategories(response.data);
    });
  }, []);

  return <TanTable columns={columns} data={categories ?? []} />;
}
