import { useCallback, useEffect, useRef, useState } from 'react';
import { PaginationState } from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';

export function usePaginationState(
  defaultPage: number = 0,
  pageSizeVariants: number[],
  queryKey: string | null,
  keyPrefix?: string = ''
) {
  const pageQueryKey = `${keyPrefix}_page`;
  const itemsQueryKey = `${keyPrefix}_items`;

  const [searchParams, setSearchParams] = useSearchParams();

  const [paginationState, setPaginationState] = useState<PaginationState>(
    () => {
      let page = defaultPage;
      let size = pageSizeVariants[0];
      const pageParam = searchParams.get(pageQueryKey);
      if (pageParam) {
        const parsed = parseInt(pageParam, 10);
        if (!isNaN(parsed) && parsed >= 0) {
          page = parsed;
        }
      }

      const sizeParam = searchParams.get(itemsQueryKey);
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
      newParams.set(pageQueryKey, String(pagination.pageIndex ?? defaultPage));
      newParams.set(
        itemsQueryKey,
        String(
          pageSizeVariants.includes(pagination.pageSize)
            ? pagination.pageSize
            : pageSizeVariants[0]
        )
      );
      setSearchParams(
        prev => {
          prev.set(pageQueryKey, String(pagination.pageIndex));
          prev.set(itemsQueryKey, String(pagination.pageSize));
          return prev;
        },
        { replace }
      );
      setPaginationState({
        ...pagination,
      });
    },
    [
      defaultPage,
      pageSizeVariants,
      searchParams.get(pageQueryKey),
      setSearchParams,
    ]
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
      // setPaginationState({
      //   ...paginationState,
      //   pageIndex: 0,
      // })
    }
    prevQueryKeyRef.current = queryKey;
  }, [queryKey]);

  useEffect(() => {
    if (!searchParams.get(pageQueryKey)) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(pageQueryKey, String(paginationState.pageIndex));
      setSearchParams(prev => newSearchParams, { replace: true });
    }
    if (!searchParams.get(itemsQueryKey)) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(itemsQueryKey, String(paginationState.pageSize));
      setSearchParams(prev => newSearchParams, { replace: true });
    }
  }, [searchParams, setSearchParams, paginationState]);

  useEffect(() => {
    const pageParam = searchParams.get(pageQueryKey);
    const sizeParam = searchParams.get(itemsQueryKey);
    if (pageParam || sizeParam) {
      let newPage = paginationState.pageIndex;
      let newSize = paginationState.pageSize;
      if (pageParam !== null) {
        const parsed = parseInt(pageParam, 10);
        if (!isNaN(parsed) && parsed >= 0) {
          newPage = parsed;
        }
      }

      if (sizeParam !== null) {
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
  }, [searchParams, paginationState]);

  return {
    pagination: paginationState,
    setPagination: updatePagination,
    pageSizeVariants,
  };
}
