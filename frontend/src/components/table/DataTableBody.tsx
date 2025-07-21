import { Table } from '@chakra-ui/react';
import { Skeleton } from '@radix-ui/themes';
import { Cell, flexRender, Table as ITable } from '@tanstack/react-table';

import { alignRight } from './common';

interface DataTableBodyProps<T extends object> {
  table: ITable<T>;
  isLoading?: boolean;
}

export function DataTableBody<T extends object>({
  table,
  isLoading,
}: DataTableBodyProps<T>) {
  function data(cell: Cell<T, unknown>) {
    return (
      <div className="size-full">
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </div>
    );
  }

  return (
    <Table.Body className="divide-y divide-background-secondary bg-background-primary text-text">
      {table.getRowModel().rows.map(row => (
        <Table.Row key={row.id} className="h-20">
          {row.getVisibleCells().map(cell => (
            <Table.Cell
              key={cell.id}
              className="size-full bg-background-primary p-4"
              style={{
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
                    <Skeleton className="min-h-10 min-w-10">
                      {data(cell)}
                    </Skeleton>
                  ) : (
                    <div>{data(cell)}</div>
                  )}
                </div>
              </div>
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  );
}
