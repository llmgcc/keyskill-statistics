import { ColumnMeta } from '@tanstack/react-table';

export function alignRight<T>(meta?: ColumnMeta<T, unknown>) {
  return meta?.alignRight ?? false;
}
