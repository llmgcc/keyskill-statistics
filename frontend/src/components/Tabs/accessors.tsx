import { Chart, KeySkill, SalaryChart } from '@/interfaces';
import { getPercentDifference } from '@/utils/common';
import { Skeleton } from '@radix-ui/themes';
import { ColumnDef, sortingFns } from '@tanstack/react-table';
import { GoDiff } from 'react-icons/go';
import colors from 'tailwindcss/colors';

import { Experience } from '@/config/experience';
import { CountRenderer } from '@/components/Table/renderers/CountRenderer';
import { SalaryRenderer } from '@/components/Table/renderers/SalaryRenderer';
import { ValueChangeRenderer } from '@/components/Table/renderers/ValueChangeRenderer';

import { SkillPlot } from '../Charts/SkillPlot';
import { SkillDescription } from '../SkillDescription/SkillDescription';
import { CategoryDescription } from '../ui/CategoryDescription';

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
  header: () => <div>{config.header}</div>,
  sortingFn: sortingFns.alphanumeric,
  cell: (info) => {
    return (
      <div>
        <SkillDescription {...info.row.original} />
      </div>
    );
  },
  size: 0,
  enablePinning: true,
});

export const categoryNameAccessor = <T extends KeySkill>(config: {
  accessorKey: string;
  header?: string;
  size?: number;
  category: 'domain' | 'category';
}): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  header: () => <div>{config.header}</div>,
  sortingFn: sortingFns.alphanumeric,
  cell: (info) => {
    return (
      <CategoryDescription
        categoryKey={config.category}
        categoryName={info.row.original.name}
      />
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
    function getMax() {
      const ratio = info.row.original.ratio;
      if (ratio) {
        return (info.getValue() as number) / info.row.original.ratio;
      }
      const allValues = info.table
        .getFilteredRowModel()
        .rows.map((row) => row.getValue('count') as number);
      const maxValue = Math.max(...allValues);
      return maxValue;
    }

    return (
      <CountRenderer count={info.getValue() as number} maxCount={getMax()} />
    );
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
  selectedExperience?: Experience | null;
  key: string;
  source(
    name: string,
    period: number,
    experience?: Experience | null,
  ): Promise<SalaryChart>;
}): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  header: () => (
    <div className="flex items-center">
      <div>{config.header}</div>
    </div>
  ),
  cell: (info) => {
    return (
      <SalaryRenderer
        maxCount={10 ** 6}
        isLoading={config.isLoading}
        selectedPeriod={config.selectedPeriod}
        selectedExperience={config.selectedExperience ?? undefined}
        name={info.row.original.name}
        plotKey={config.key}
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

export const prevCountAccessor = <T extends KeySkill>(
  config: {
    accessorKey: string;
    header?: string;
    size?: number;
  } = { accessorKey: 'prev_count', size: 50 },
): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  header: () => <GoDiff className="stroke-1" />,
  sortingFn: (rowa, rowb) => {
    if (!rowa.original.prev_count) {
      return 1;
    }
    if (!rowb.original.prev_count) {
      return -1;
    }
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
    return 0;
  },
  cell: (info) => {
    return (
      <div>
        <ValueChangeRenderer
          current={info.row.original.count}
          prev={info.row.original.prev_count}
          percent={true}
        />
      </div>
    );
  },
  size: 100,
  meta: {
    alignRight: true,
  },
});

export const chartAccessor = <T extends KeySkill>(config: {
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
  ): Promise<Chart[]>;
}): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  header: () => <div>{config.header}</div>,
  cell: (info) => {
    const color =
      !info.row.original.prev_count ||
      info.row.original.count >= info.row.original.prev_count
        ? colors.green[400]
        : colors.red[500];
    return (
      <div style={{ height: '40px' }} className="w-40">
        <div className="size-full">
          <Skeleton loading={config.isLoading} className="size-full">
            <SkillPlot
              name={info.row.original.name}
              plotKey={config.key}
              source={config.source}
              period={config.selectedPeriod}
              color={color}
              strokeWidth={2}
              experience={config.selectedExperience}
            />
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
});

export const confidenceAccessor = <T extends KeySkill>(config: {
  accessorKey: string;
  header: string;
  name: string;
  categoryKey: 'domains' | 'categories';
}): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  header: config.header,
  cell: (info) => {
    const confidence = info.row.original[config.categoryKey].find(
      (c) => c.name === config.name,
    )?.confidence;
    return (
      <>
        {confidence ? (
          <div className="relative flex items-center">
            <svg className="h-5 w-5" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgb(var(--color-background-secondary))"
                strokeWidth="5"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgb(var(--color-background-gray))"
                strokeWidth="5"
                strokeDasharray={`${confidence * 100}, 100`}
              />
            </svg>
            <div className="ml-1 text-sm">
              {' '}
              {(confidence * 100).toFixed(0)}%
            </div>
          </div>
        ) : null}
      </>
    );
  },
  sortingFn: (rowA, rowB) => {
    const confidenceA =
      rowA.original[config.categoryKey].find((c) => c.name === config.name)
        ?.confidence || 0;
    const confidenceB =
      rowB.original[config.categoryKey].find((c) => c.name === config.name)
        ?.confidence || 0;
    return confidenceA - confidenceB;
  },
  size: 100,
  enableSorting: true,
  meta: {
    alignRight: true,
  },
});
