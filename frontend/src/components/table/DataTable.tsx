import { Dispatch, SetStateAction, useState } from 'react';
import { Table } from '@chakra-ui/react';
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

export function DataTable<T extends object>({
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
    // onSortingChange: manualSortingState?.setSorting ?? setSorting,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
    enableSortingRemoval: true,
    // manualSorting: !!manualSortingState,
  });

  return (
    <div className="d-flex tan-table relative border-collapse justify-center text-sm font-[500]">
      <div
        className={`max-w-full ${isTablet || isMobile ? 'overflow-x-scroll' : 'overflow-x-clip'}`}
      >
        <Table.Root
          className="border-shadow w-full border-t-[1px] bg-background-primary text-text-primary"
          unstyled
        >
          <DataTableHeader table={table} />
          <DataTableBody table={table} isLoading={isLoading} />
        </Table.Root>
      </div>

      {/* {!!pagination && (
        <Pagination
          totalRows={pagination.totalRows}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          onPageChange={pagination.onPageChange}
          pages={pagination.pages}
        />
      )} */}
    </div>
  );
}
