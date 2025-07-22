import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Table } from '@chakra-ui/react';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { Overlay } from '../ui/Overlay';
import { DataTableBody } from './DataTableBody';
import { DataTableHeader } from './DataTableHeader';

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
  isFetching?: boolean;
  pagination?: PaginationState;
  sorting?: DataTableSortingState;
  minWidth?: number;
  pinnedLeft?: string[];
}

export function DataTable<T extends object>({
  data,
  columns,
  isLoading = false,
  isFetching = false,
  minWidth = 1150,
  pinnedLeft,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  // const { isTablet, isMobile } = useScreenSize();

  const ref = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new ResizeObserver(_ => {
      const isOverflowing = container.clientWidth < minWidth;
      if (isOverflowing !== isOverflow && container.clientWidth) {
        setIsOverflow(isOverflowing);
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [minWidth, isOverflow]);

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
      columnPinning: {
        left: pinnedLeft,
        right: [],
      },
    },
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
    enableSortingRemoval: true,
    // manualSorting: !!manualSortingState,
    enableColumnPinning: true,
  });

  return (
    <div className="d-flex tan-table relative border-collapse justify-center text-sm font-[500]">
      <div
        className={`max-w-full ${isOverflow ? 'overflow-x-auto' : 'overflow-x-clip'}`}
        ref={ref}
      >
        <Overlay isLoading={false} isFetching={isFetching}>
          <Table.Root
            className="border-shadow w-full bg-background-primary text-text-primary"
            unstyled
          >
            <DataTableHeader
              table={table}
              pinned={isOverflow}
              isLoading={isLoading || isFetching}
            />
            <DataTableBody
              table={table}
              isLoading={isLoading}
              pinned={isOverflow}
            />
          </Table.Root>
        </Overlay>
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
