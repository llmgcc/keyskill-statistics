import { Table } from '@chakra-ui/react';
import { flexRender, Header, Table as ITable } from '@tanstack/react-table';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

import { useTopOffset } from '@/hooks/useTopOffset';

import { alignRight, getCommonPinningStyles, padding } from './common';

interface DataTableHeaderProps<T extends object> {
  table: ITable<T>;
  pinned: boolean;
  isLoading: boolean;
}

export function DataTableHeader<T extends object>({
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
      className={`${!pinned && 'sticky'} ${isLoading ? 'z-[400]' : 'z-[1000]'} h-10 w-full border-spacing-0 text-xs shadow-sm shadow-background-secondary`}
      style={{
        top: `${headerOffset + filterOffset + navOffset}px`,
      }}
    >
      {table.getHeaderGroups().map(headerGroup => (
        <Table.Row key={headerGroup.id} className="">
          {headerGroup.headers.map(header => (
            <Table.ColumnHeader
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              style={{
                // minWidth: header.getSize()
                //   ? `${header.getSize()}px`
                //   : 'fit-content',
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
