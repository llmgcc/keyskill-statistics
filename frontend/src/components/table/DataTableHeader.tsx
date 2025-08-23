import { Table } from '@chakra-ui/react';
import { flexRender, Header, Table as ITable } from '@tanstack/react-table';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

import { useTopOffset } from '@/hooks/useTopOffset';

import { alignRight, getCommonPinningStyles, padding } from './common';

interface DataTableHeaderProps<T> {
  table: ITable<T>;
  pinned: boolean;
  isLoading: boolean;
}

export function DataTableHeader<T>({
  table,
  pinned,
  isLoading,
}: DataTableHeaderProps<T>) {
  function sortingIcon(header: Header<T, unknown>) {
    function sortingDirection() {
      const sortDirection = header.column.getIsSorted();
      if (sortDirection) {
        return sortDirection == 'asc' ? (
          <TiArrowSortedUp />
        ) : (
          <TiArrowSortedDown />
        );
      }
      return null;
    }

    return <div className="size-3">{sortingDirection()}</div>;
  }

  const navOffset = useTopOffset('#navbar');
  const filterOffset = useTopOffset('#filter');
  const headerOffset = useTopOffset('#header');

  return (
    <Table.Header
      className={`${!pinned && 'sticky'} h-10 border-b-[1px] border-background-secondary ${isLoading ? 'z-[400]' : 'z-[1000]'} w-full border-spacing-0 text-xs shadow-sm shadow-background-secondary`}
      style={{
        top: !pinned ? `${headerOffset + filterOffset + navOffset}px` : 0,
      }}
    >
      {table.getHeaderGroups().map(headerGroup => (
        <Table.Row key={headerGroup.id} className="h-10">
          {headerGroup.headers.map(header => (
            <Table.ColumnHeader
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              style={{
                width: header.getSize()
                  ? `${header.getSize()}px`
                  : 'fit-content',
                minWidth: header.getSize()
                  ? `${header.getSize()}px`
                  : 'fit-content',
                maxWidth: header.getSize()
                  ? `${header.getSize()}px`
                  : 'fit-content',
                ...(pinned && getCommonPinningStyles(header.column)),
                ...padding(header.column.columnDef.meta),
              }}
              className={`m-0 select-none bg-background-primary p-0 ${header.column.getCanSort() && 'cursor-pointer'}`}
            >
              <div>
                <div
                  className={`flex items-center bg-background-primary ${alignRight(header.column.columnDef.meta) ? 'justify-end' : 'justify-start'}`}
                >
                  {alignRight(header.column.columnDef.meta)
                    ? sortingIcon(header)
                    : null}
                  <div className={`font-[700] text-text-primary`}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                  {alignRight(header.column.columnDef.meta)
                    ? null
                    : sortingIcon(header)}
                </div>
              </div>
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      ))}
    </Table.Header>
  );
}
