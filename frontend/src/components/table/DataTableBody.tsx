import { Skeleton, Table } from '@chakra-ui/react';
import { flexRender, Table as ITable } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { alignRight, getCommonPinningStyles, padding } from './common';

interface DataTableBodyProps<T> {
  table: ITable<T>;
  isLoading?: boolean;
  pinned: boolean;
  onSelect: (rowData: T) => void;
}

export function DataTableBody<T>({
  table,
  isLoading,
  pinned,
  onSelect,
}: DataTableBodyProps<T>) {
  const { t } = useTranslation();
  const rows = table.getRowModel().rows;
  const hasNoRows = rows.length === 0;

  return (
    <Table.Body className="divide-y divide-background-secondary bg-background-primary text-text">
      {hasNoRows ? (
        <Table.Row className="h-40 rounded">
          <Table.Cell
            colSpan={table.getAllColumns().length}
            className="bg-background-primary p-4 text-center text-sm"
          >
            <div className="py-4 text-text-secondary">{t('common.noData')}</div>
          </Table.Cell>
        </Table.Row>
      ) : (
        rows.map(row => (
          <Table.Row
            key={row.id}
            className={`cursor-pointer bg-background-primary ${!isLoading && 'hover:bg-background-secondary/50'}`}
            onClick={() => !isLoading && onSelect(row.original)}
          >
            {row.getVisibleCells().map(cell => (
              <Table.Cell
                key={cell.id}
                className={`overflow-hidden truncate text-ellipsis py-4`}
                style={{
                  minWidth: cell.column.getSize()
                    ? `${cell.column.getSize()}px`
                    : 'fit-content',
                  maxWidth: cell.column.getSize()
                    ? `${cell.column.getSize()}px`
                    : 'fit-content',
                  width: cell.column.getSize()
                    ? `${cell.column.getSize()}px`
                    : 'fit-content',
                  ...(pinned && getCommonPinningStyles(cell.column)),
                  ...padding(cell.column.columnDef.meta),
                }}
              >
                <Skeleton
                  className={`size-full ${isLoading && 'min-h-10 min-w-10 bg-background-secondary'}`}
                  loading={isLoading}
                >
                  <div
                    className={`${alignRight(cell.column.columnDef.meta) ? 'flex size-full items-end justify-end text-end' : 'size-full text-left align-middle'}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </Skeleton>
              </Table.Cell>
            ))}
          </Table.Row>
        ))
      )}
    </Table.Body>
  );
}
