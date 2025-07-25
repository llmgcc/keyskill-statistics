import { useCallback, useEffect, useMemo, useRef } from 'react';
import { PaginationState } from '@tanstack/react-table';
import { useLocation, useSearchParams } from 'react-router-dom';

export function usePaginationState(
  defaultPage: number = 0,
  pageSizeVariants: number[],
  queryKey: string | null
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const { pageIndex, pageSize } = useMemo(() => {
    let page = defaultPage;
    let size = pageSizeVariants[0];

    const pageParam = searchParams.get('page');
    if (pageParam) {
      const parsed = parseInt(pageParam, 10);
      if (!isNaN(parsed) && parsed >= 0) {
        page = parsed;
      }
    }

    const sizeParam = searchParams.get('items');
    if (sizeParam) {
      const parsed = parseInt(sizeParam, 10);
      if (!isNaN(parsed) && pageSizeVariants.includes(parsed)) {
        size = parsed;
      }
    }

    return { pageIndex: page, pageSize: size };
  }, [searchParams, pageSizeVariants, defaultPage]);

  const updatePagination = useCallback(
    (pagination: PaginationState) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', String(pagination.pageIndex ?? defaultPage));
      newParams.set(
        'items',
        String(
          pageSizeVariants.includes(pagination.pageSize)
            ? pagination.pageSize
            : pageSizeVariants[0]
        )
      );
      setSearchParams(newParams);
    },
    [defaultPage, pageSizeVariants, searchParams, setSearchParams]
  );

  const prevQueryKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (
      (prevQueryKeyRef.current !== queryKey && prevQueryKeyRef.current) ||
      (prevQueryKeyRef.current && queryKey === null)
    ) {
      updatePagination({
        pageIndex: 0,
        pageSize,
      });
    }
    prevQueryKeyRef.current = queryKey;
  }, [queryKey, pageSize, updatePagination]);

  useEffect(() => {
    if (!searchParams.get('page')) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('page', String(pageIndex));
      setSearchParams(newSearchParams);
    }
    if (!searchParams.get('items')) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('items', String(pageSize));
      setSearchParams(newSearchParams);
    }
  }, [searchParams, setSearchParams, location.pathname, pageIndex, pageSize]);

  return {
    pagination: {
      pageSize,
      pageIndex,
    },
    setPagination: updatePagination,
    pageSizeVariants,
  };
}
