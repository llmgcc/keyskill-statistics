import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    alignRight?: boolean;
    paddingLeft?: number;
    paddingRight?: number;
  }
}
