import { getPercentDifference } from '@/utils/common';
import { ColumnDef, sortingFns } from '@tanstack/react-table';
import { FaRegStar } from 'react-icons/fa';
import { GoDiff } from 'react-icons/go';

import { KeySkill } from '@/interfaces';
import { CountRenderer } from '@/components/Table/renderers/CountRenderer';
import { SalaryRenderer } from '@/components/Table/renderers/SalaryRenderer';
import { ValueChangeRenderer } from '@/components/Table/renderers/ValueChangeRenderer';

import { CircleProgress } from '../Charts/CircleProgress';
import { SkillTrend } from '../Charts/Trend/SkillTrend';
import { SkillDescription } from '../SkillDescription/SkillDescription';
import { CategoryDescription } from '../ui/CategoryDescription';
import { SkillImage } from '../ui/SkillImage';

export const skillImageAccessor = <T extends KeySkill>(config: {
  accessorKey: string;
  header?: string;
  size?: number;
}): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  header: config.header ?? '',
  size: config.size || 0,
  cell: info => (
    <SkillImage
      path={info.row.original.image}
      domains={info.row.original.domains?.[0]?.name}
      categories={info.row.original.categories?.[0]?.name}
    />
  ),
  enablePinning: true,
  enableSorting: false,
  meta: {
    paddingLeft: 10,
    paddingRight: 5,
  },
});

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
  enablePinning: true,
  meta: {
    alignRight: true,
  },
});

export const complexityAccessor = <T extends KeySkill>(config: {
  accessorKey: string;
  header?: string;
  size?: number;
}): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  header: config.header ?? 'Complexity',
  size: config.size || 150,
  cell: info => {
    const complexity = info.row.original.complexity_score;
    return (
      <>
        {complexity ? (
          <div className="relative flex items-center">
            <CircleProgress value={complexity} maxValue={1} />
            <div className="ml-1 text-sm">
              {' '}
              {(complexity * 100).toFixed(0)}%
            </div>
          </div>
        ) : null}
      </>
    );
  },
  meta: {
    alignRight: true,
  },
});

export const prevPlaceAccessor = <T extends KeySkill>(
  config: {
    accessorKey: string;
    header?: string;
    size?: number;
  } = { accessorKey: 'prev_place', size: 50 }
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
    const a = rowa.original.prev_place - (rowa.original.place ?? 0);
    const b = rowb.original.prev_place - (rowb.original.place ?? 0);
    return a < b ? 1 : a > b ? -1 : 0;
  },
  cell: info => {
    const prev = info.row.original.prev_place;
    const current = info.row.original.place;
    return <ValueChangeRenderer prev={prev} current={current ?? 0} />;
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
  cell: info => {
    return (
      <div className="overflow-hidden">
        <SkillDescription skill={info.row.original} image={false} />
      </div>
    );
  },
  size: 500,
  meta: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export const favouriteAccessor = <T extends KeySkill>(config: {
  accessorKey: string;
}): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  header: () => <div></div>,
  sortingFn: sortingFns.alphanumeric,
  cell: _ => {
    return <FaRegStar className={`p-0 text-background-accent`} />;
  },
  size: 5,
});

export const categoryNameAccessor = <T extends KeySkill>(config: {
  accessorKey: string;
  header?: string;
  size?: number;
  category: 'domains' | 'categories';
}): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  header: () => <div>{config.header}</div>,
  sortingFn: sortingFns.alphanumeric,
  cell: info => {
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
  cell: info => {
    return (
      <CountRenderer
        count={info.getValue() as number}
        prevCount={info.row.original.prev_count}
      />
    );
  },
  header: () => (
    <div className="flex items-center">
      <div className="">{config.header ?? 'Mentions'}</div>
    </div>
  ),
  size: 100,
  meta: {
    alignRight: true,
  },
});

export const salaryAccessor = <T extends KeySkill>(config: {
  accessorKey: string;
  header?: string;
  relatedTo?: string | null;
}): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  header: () => (
    <div className="flex items-center">
      <div>{config.header}</div>
    </div>
  ),
  cell: info => {
    return (
      <SalaryRenderer skill={info.row.original} realtedTo={config.relatedTo} />
    );
  },
  size: 120,
  meta: {
    alignRight: true,
  },
});

export const prevCountAccessor = <T extends KeySkill>(
  config: {
    accessorKey: string;
    header?: string;
    size?: number;
  } = { accessorKey: 'prev_count', size: 50 }
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
      rowa.original.count ?? 0,
      rowa.original.prev_count
    );
    const b = getPercentDifference(
      rowb.original.count ?? 0,
      rowb.original.prev_count
    );
    if (rowa.original.prev_place && rowb.original.prev_place) {
      return a < b ? 1 : a > b ? -1 : 0;
    }
    return 0;
  },
  cell: info => {
    return (
      <div>
        <ValueChangeRenderer
          current={info.row.original.count ?? 0}
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

export const prevSalaryAccessor = <T extends KeySkill>(
  config: {
    accessorKey: string;
    header?: string;
    size?: number;
  } = { accessorKey: 'prev_average_salary', size: 50 }
): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  header: () => <GoDiff className="stroke-1" />,
  sortingFn: (rowa, rowb) => {
    if (!rowa.original.prev_average_salary) {
      return 1;
    }
    if (!rowb.original.prev_average_salary) {
      return -1;
    }
    const a = getPercentDifference(
      rowa.original.average_salary ?? 0,
      rowa.original.prev_average_salary
    );
    const b = getPercentDifference(
      rowb.original.average_salary ?? 0,
      rowb.original.prev_average_salary
    );
    if (
      rowa.original.prev_average_salary &&
      rowb.original.prev_average_salary
    ) {
      return a < b ? 1 : a > b ? -1 : 0;
    }
    return 0;
  },
  cell: info => {
    return (
      <div>
        <ValueChangeRenderer
          current={info.row.original.average_salary ?? 0}
          prev={info.row.original.prev_average_salary}
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
  relatedTo?: string | null;
}): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  header: () => <div>{config.header}</div>,
  cell: info => {
    return (
      <div style={{ height: '40px' }} className="size-full">
        <SkillTrend skill={info.row.original} realtedTo={config.relatedTo} />
      </div>
    );
  },
  size: 120,
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
  cell: info => {
    const confidence = info.row.original[config.categoryKey].find(
      c => c.name === config.name
    )?.confidence;
    return (
      <>
        {confidence ? (
          <div className="relative flex items-center">
            <CircleProgress value={confidence} maxValue={1} />
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
      rowA.original[config.categoryKey].find(c => c.name === config.name)
        ?.confidence || 0;
    const confidenceB =
      rowB.original[config.categoryKey].find(c => c.name === config.name)
        ?.confidence || 0;
    return confidenceA - confidenceB;
  },
  size: 100,
  enableSorting: true,
  meta: {
    alignRight: true,
  },
});

export const similarityAccessor = <T extends KeySkill>(config: {
  accessorKey: string;
  header: string;
}): ColumnDef<T> => ({
  accessorKey: config.accessorKey as string,
  header: config.header,
  cell: info => {
    const similarity = info.row.original.similarity_score ?? 0;
    return (
      <>
        {similarity ? (
          <>
            <div className="mx-1">
              <CircleProgress value={similarity} maxValue={1} />
            </div>
            <div> {(similarity * 100).toFixed(0)}%</div>
          </>
        ) : null}
      </>
    );
  },
  size: 100,
  enableSorting: true,
  meta: {
    alignRight: true,
  },
});
