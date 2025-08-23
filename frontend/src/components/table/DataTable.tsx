import { useEffect, useRef, useState } from 'react';
import { Table } from '@chakra-ui/react';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { Overlay } from '../ui/Overlay';
import { ScrollToTopButton } from '../ui/ScrollToTopButton';
import { DataTableBody } from './DataTableBody';
import { DataTableHeader } from './DataTableHeader';
import { PaginationButtons } from './PaginationButtons';

export interface DataTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  isFetching?: boolean;
  minWidth?: number;
  pinnedLeft?: string[];
  pagination?: PaginationState;
  setPagination?: OnChangeFn<PaginationState>;
  rows?: number;
  pageSizeVariants: number[];
  onSelect?: (rowData: T) => void;
}

export function DataTable<T extends object>({
  data,
  columns,
  isLoading = false,
  isFetching = false,
  minWidth = 1150,
  pinnedLeft,
  pagination,
  setPagination,
  rows,
  pageSizeVariants,
  onSelect,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
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

  const scrollToTabs = () => {
    const offset = 175;
    const element = ref.current;
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination ?? undefined,
    state: {
      sorting: sorting,
      columnPinning: {
        left: isOverflow ? pinnedLeft : [],
        right: [],
      },
      pagination: pagination ?? undefined,
    },
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
    enableSortingRemoval: true,
    enableColumnPinning: true,
    autoResetPageIndex: false,
    manualPagination: true,
    // debugTable: true,
  });

  return (
    <div className="d-flex tan-table relative border-collapse justify-center text-sm font-[500]">
      <div
        className={`max-w-full ${isOverflow ? 'overflow-x-auto' : 'overflow-x-clip'}`}
        ref={ref}
      >
        <Overlay isLoading={false} isFetching={isFetching}>
          <Table.Root
            className="w-full bg-background-primary text-text-primary"
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
              onSelect={onSelect ?? (() => {})}
            />
          </Table.Root>
        </Overlay>
      </div>

      {!!pagination && !!rows && !!setPagination && (
        <PaginationButtons
          rows={rows}
          pagination={pagination}
          pageSizeVariants={pageSizeVariants}
          setPagination={setPagination}
          isLoading={isLoading || isFetching}
        />
      )}
      <ScrollToTopButton element={ref} onClick={scrollToTabs} />
    </div>
  );
}
