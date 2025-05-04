import { useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { DataTableBody } from './DataTableBody';
import { DataTableHeader } from './DataTableHeader';

interface DataTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
}

export function DataTable<T extends object>({
  data,
  columns,
  isLoading = false,
}: DataTableProps<T>) {
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
  });

  return (
    <div className="d-flex tan-table relative border-collapse justify-center text-sm font-[500] leading-none">
      <div className="max-w-full overflow-x-clip">
        <table className="border-shadow w-full bg-background-primary text-text-primary">
          <DataTableHeader table={table} />
          <DataTableBody table={table} isLoading={isLoading} />
        </table>
      </div>
    </div>
  );
}
