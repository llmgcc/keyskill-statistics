import { useCallback, useEffect, useRef, useState } from 'react';
import { PaginationState } from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';

export function usePaginationState(
  defaultPage: number = 0,
  pageSizeVariants: number[],
  queryKey: string | null
) {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log('here', searchParams.get('page'), searchParams.get('items'));
  const [paginationState, setPaginationState] = useState<PaginationState>(
    () => {
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

      return {
        pageIndex: Math.max(0, page),
        pageSize: size,
      };
    }
  );

  const updatePagination = useCallback(
    (pagination: PaginationState, replace = false) => {
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
      setSearchParams(newParams, { replace });
      setPaginationState(prev => ({
        ...pagination,
      }));
    },
    [defaultPage, pageSizeVariants, searchParams, setSearchParams]
  );

  // Reset
  const prevQueryKeyRef = useRef<string | null>(null);
  useEffect(() => {
    if (
      (prevQueryKeyRef.current !== queryKey && prevQueryKeyRef.current) ||
      (prevQueryKeyRef.current && queryKey === null)
    ) {
      updatePagination(
        {
          ...paginationState,
          pageIndex: 0,
        },
        true
      );
    }
    prevQueryKeyRef.current = queryKey;
  }, [queryKey, paginationState, updatePagination]);

  useEffect(() => {
    if (!searchParams.get('page')) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('page', String(paginationState.pageIndex));
      setSearchParams(prev => newSearchParams, { replace: true });
    }
    if (!searchParams.get('items')) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('items', String(paginationState.pageSize));
      setSearchParams(prev => newSearchParams, { replace: true });
    }
  }, [searchParams, setSearchParams, paginationState]);

  useEffect(() => {
    const pageParam = searchParams.get('page');
    const sizeParam = searchParams.get('items');
    if (pageParam || sizeParam) {
      let newPage = paginationState.pageIndex;
      let newSize = paginationState.pageSize;

      if (pageParam) {
        const parsed = parseInt(pageParam, 10);
        if (!isNaN(parsed) && parsed >= 0) {
          newPage = parsed;
        }
      }

      if (sizeParam) {
        const parsed = parseInt(sizeParam, 10);
        if (!isNaN(parsed) && pageSizeVariants.includes(parsed)) {
          newSize = parsed;
        }
      }
      if (
        newPage !== paginationState.pageIndex ||
        newSize !== paginationState.pageSize
      ) {
        updatePagination(
          {
            pageIndex: newPage,
            pageSize: newSize,
          },
          true
        );
      }
    }
  }, [searchParams]);

  return {
    pagination: paginationState,
    setPagination: updatePagination,
    pageSizeVariants,
  };
}
