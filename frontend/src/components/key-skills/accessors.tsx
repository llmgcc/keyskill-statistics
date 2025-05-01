// columns/commonColumns.ts
import { KeySkill, SalaryChart } from '@/interfaces';
import { ColumnDef, sortingFns } from '@tanstack/react-table';
import { GoDiff } from 'react-icons/go';

import { Experience } from '@/config/experience';

import { CountRenderer } from '../table/renderers/CountRenderer';
import { SalaryRenderer } from '../table/renderers/SalaryRenderer';
import { ValueChangeRenderer } from '../table/renderers/ValueChangeRenderer';
import SkillDescription from '../ui/SkillDescription';
import SkillImage from '../ui/SkillImage';

export type RankedItem = {
  [key: string]: any;
};

export const placeAccessor = <T extends KeySkill>(config: {
  accessorKey: string;
  header?: string;
  size?: number;
}): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  header: config.header ?? '#',
  size: config.size || 50,
  cell: ({ getValue }) => (
    <div className="text-text-secondary">{getValue() as number}</div>
  ),
  meta: {
    alignRight: true,
  },
});

export const prevPlaceAccessor = <T extends KeySkill>(
  config: {
    accessorKey: string;
    header?: string;
    size?: number;
  } = { accessorKey: 'prev_place', size: 50 },
): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  header: () => (
    <div>
      <GoDiff className="stroke-1" />
    </div>
  ),
  sortingFn: (rowa, rowb) => {
    if (!rowa.original.prev_place) {
      return 1;
    }
    if (!rowb.original.prev_place) {
      return -1;
    }
    const a = rowa.original.prev_place - rowa.original.place;
    const b = rowb.original.prev_place - rowb.original.place;
    return a < b ? 1 : a > b ? -1 : 0;
  },
  cell: (info) => {
    const prev = info.row.original.prev_place;
    const current = info.row.original.place;
    return <ValueChangeRenderer prev={prev} current={current} />;
  },
  size: 50,
  enablePinning: true,
  meta: {
    alignRight: true,
  },
});

export const skillNameAccessor = <T extends KeySkill>(config: {
  accessorKey: string;
  header?: string;
  size?: number;
}): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  header: () => <div>Name</div>,
  sortingFn: sortingFns.alphanumeric,
  cell: (info) => {
    return <SkillDescription {...info.row.original} />;
  },
  size: 0,
  enablePinning: true,
});

export const categoryNameAccessor = <T extends KeySkill>(config: {
  accessorKey: string;
  header?: string;
  size?: number;
  category: string;
}): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  header: () => <div>Name</div>,
  sortingFn: sortingFns.alphanumeric,
  cell: (info) => {
    return (
      <div className="flex items-center">
        <div className="mr-2 flex aspect-square w-6 items-center justify-center">
          <SkillImage {...{ [config.category]: info.row.original.name }} />
        </div>
        <div className="text-sm font-[600] capitalize">
          {info.row.original.name}
        </div>
      </div>
    );
  },
  size: 0,
});

export const countAccessor = <T extends KeySkill>(config: {
  accessorKey: string;
  header?: string;
  size?: number;
}): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  cell: (info) => {
    const max = Math.max(
      ...info.table.getCenterRows().map((r) => r.original.count),
    );
    return <CountRenderer count={info.getValue() as number} maxCount={max} />;
  },
  header: () => (
    <div className="flex items-center">
      <div className="">{config.header ?? 'Mentions'}</div>
    </div>
  ),
  size: 150,
  meta: {
    alignRight: true,
  },
});

export const salaryAccessor = <T extends KeySkill>(config: {
  accessorKey: string;
  header?: string;
  size?: number;
  isLoading: boolean;
  selectedPeriod: number;
  selectedExperience?: Experience;
  key: string;
  source(
    name: string,
    period: number,
    experience?: Experience,
  ): Promise<SalaryChart>;
}): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  header: () => (
    <div className="flex items-center">
      <div className="mr-1">Salary</div>
    </div>
  ),
  cell: (info) => {
    return (
      <SalaryRenderer
        maxCount={10 ** 6}
        isLoading={config.isLoading}
        selectedPeriod={config.selectedPeriod}
        selectedExperience={config.selectedExperience}
        name={info.row.original.name}
        key={config.key}
        count={(info.getValue() as number) ?? 0}
        source={config.source}
      />
    );
  },
  size: 150,
  meta: {
    alignRight: true,
  },
});
