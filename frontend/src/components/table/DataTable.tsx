import { Dispatch, memo, SetStateAction, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { useScreenSize } from '@/hooks/useScreenSize';

import { DataTableBody } from './DataTableBody';
import { DataTableHeader } from './DataTableHeader';
import { Pagination } from './Pagination';

interface PaginationState {
  totalRows: number;
  pageSize: number;
  pageIndex: number;
  onPageChange: (page: number, pageSize: number) => void;
  pages: number[];
}

interface DataTableSortingState {
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
}

interface DataTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  pagination?: PaginationState;
  sorting?: DataTableSortingState;
}

function _DataTable<T extends object>({
  data,
  columns,
  isLoading = false,
  pagination,
  sorting: manualSortingState,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { isTablet, isMobile } = useScreenSize();

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: manualSortingState?.setSorting ?? setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: manualSortingState?.sorting ?? sorting,
    },
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
    enableSortingRemoval: true,
    manualSorting: !!manualSortingState,
  });

  return (
    <div className="d-flex tan-table relative border-collapse justify-center text-sm font-[500] leading-none">
      <div
        className={`max-w-full ${isTablet || isMobile ? 'overflow-x-scroll' : 'overflow-x-clip'}`}
      >
        <table className="border-shadow w-full bg-background-primary text-text-primary">
          <DataTableHeader table={table} />
          <DataTableBody table={table} isLoading={isLoading} />
        </table>
      </div>

      {!!pagination && (
        <Pagination
          totalRows={pagination.totalRows}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          onPageChange={pagination.onPageChange}
          pages={pagination.pages}
        />
      )}
    </div>
  );
}

export const DataTable = memo(_DataTable);
