import { useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { TanTableBody } from './TanTableBody';
import { TanTableHeader } from './TanTableHeader';

import './TanTable.css';

import { Select } from '@radix-ui/themes';

import { Pagination } from '../ui/Pagination';

interface TanTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  manualPagination?: boolean;
  onPaginationChange: (pagination: PaginationState) => void;
  totalPages: number;
  pagination: PaginationState;
  isLoading: boolean;
  isFetching: boolean;
  pageSizeVariants: number[];
  onPageSizeChange: (pageSize: number) => void;
}

export function TanTable<T extends object>({
  data,
  columns,
  manualPagination,
  onPaginationChange,
  totalPages,
  pagination,
  isLoading,
  isFetching,
  pageSizeVariants,
  onPageSizeChange,
}: TanTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
    enableSortingRemoval: true,
    manualPagination: manualPagination,
    onPaginationChange: onPaginationChange,
    enableColumnPinning: true,
    initialState: {
      columnPinning: {
        left: ['place', 'prev_place', 'name'],
      },
    },
  });

  return (
    <div className="d-flex tan-table relative border-collapse justify-center text-sm font-[500] leading-none">
      <div className="max-w-full overflow-x-clip">
        <table className="border-shadow w-full bg-background-primary text-text-primary">
          <TanTableHeader table={table} />
          <TanTableBody
            table={table}
            isLoading={isLoading}
            isFetching={isFetching}
            pageSize={pagination.pageSize}
          />
        </table>
      </div>

      <div className="my-4 flex items-center justify-between">
        <div className="text-xs text-text-secondary">
          Showing {pagination.pageIndex * pagination.pageSize + 1} to{' '}
          {Math.min(
            pagination.pageSize * (pagination.pageIndex + 1),
            totalPages,
          )}{' '}
          of {totalPages} results
        </div>
        <div>
          <Pagination
            currentPage={pagination.pageIndex + 1}
            totalPages={Math.ceil((totalPages ?? 0) / pagination.pageSize)}
            onPageChange={(page) => table.setPageIndex(page - 1)}
            isLoading={isLoading}
          />
        </div>
        <div>
          <Select.Root
            defaultValue="25"
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <Select.Trigger className="min-w-24 text-xs font-bold" />
            <Select.Content position="popper" className="bg-background">
              {pageSizeVariants.map((variant) => (
                <Select.Item key={variant} value={variant.toString()}>
                  Show {variant}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>
      </div>
    </div>
  );
}
