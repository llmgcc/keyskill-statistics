import { CSSProperties } from 'react';
import { Column, ColumnMeta } from '@tanstack/react-table';

export function alignRight<T>(meta?: ColumnMeta<T, unknown>) {
  return meta?.alignRight ?? false;
}

export function padding<T>(meta?: ColumnMeta<T, unknown>) {
  return {
    paddingLeft:
      typeof meta?.paddingLeft === 'number' ? `${meta.paddingLeft}px` : '16px',
    paddingRight:
      typeof meta?.paddingRight === 'number'
        ? `${meta.paddingRight}px`
        : '16px',
  };
}

export function getCommonPinningStyles<T>(
  column: Column<T, unknown>
): CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px rgb(var(--color-background-gray)) inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px rgb(var(--colors-background-gray)) inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
}
