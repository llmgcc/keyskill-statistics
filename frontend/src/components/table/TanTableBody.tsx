import { Skeleton } from '@radix-ui/themes';
import { Cell, flexRender, Table } from '@tanstack/react-table';

import { alignRight, getCommonPinningStyles } from './common';

interface TanTableBodyProps<T extends object> {
  table: Table<T>;
  isLoading?: boolean;
  isFetching?: boolean;
  pageSize?: number;
}

export function TanTableBody<T extends object>({
  table,
  isLoading,
}: TanTableBodyProps<T>) {
  function data(cell: Cell<T, unknown>) {
    return (
      <div className="size-full">
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </div>
    );
  }

  return (
    <tbody className="divide-y divide-background-secondary text-text">
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id} className="h-20">
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className="size-full p-4"
              style={{
                ...getCommonPinningStyles(cell.column),
                width: cell.column.getSize()
                  ? `${cell.column.getSize()}px`
                  : 'fit-content',
              }}
            >
              <div
                className={`${alignRight(cell.column.columnDef.meta) ? 'size-full text-right' : 'size-full text-left'}`}
              >
                <div className="size-full">
                  {isLoading ? (
                    <Skeleton className="min-w-5">{data(cell)}</Skeleton>
                  ) : (
                    <div>{data(cell)}</div>
                  )}
                </div>
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
