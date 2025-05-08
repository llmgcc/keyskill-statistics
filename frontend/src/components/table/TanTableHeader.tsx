import { flexRender, Header, Table } from '@tanstack/react-table';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

import { useStickyOffset } from '@/hooks/useStickyOffset';

import { alignRight, getCommonPinningStyles } from './common';

interface TanTableHeaderProps<T extends object> {
  table: Table<T>;
}

export function TanTableHeader<T extends object>({
  table,
}: TanTableHeaderProps<T>) {
  const { ref, offset } = useStickyOffset('tableHeader');

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

  return (
    <thead
      className="sticky z-50 h-10 border-spacing-0 bg-background-primary text-xs shadow-background-secondary"
      ref={ref}
      style={{ top: offset }}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              style={{
                ...getCommonPinningStyles(header.column),
                minWidth: header.getSize()
                  ? `${header.getSize()}px`
                  : 'fit-content',
              }}
              className={`border-shadow select-none bg-background-primary p-4 ${header.column.getCanSort() && 'cursor-pointer'}`}
            >
              <div
                className={`flex h-full items-center ${alignRight(header.column.columnDef.meta) ? 'justify-end' : 'justify-start'}`}
              >
                {alignRight(header.column.columnDef.meta)
                  ? sortingIcon(header)
                  : null}
                <div className={`font-[700] text-text`}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </div>
                {alignRight(header.column.columnDef.meta)
                  ? null
                  : sortingIcon(header)}
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
