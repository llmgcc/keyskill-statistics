import { ButtonGroup, IconButton, Pagination } from '@chakra-ui/react';
import { PaginationState } from '@tanstack/react-table';
import { Trans } from 'react-i18next';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

import { PageSize } from './PageSize';

interface PaginationButtons {
  pagination: PaginationState;
  setPagination: (pagination: PaginationState) => void;
  rows: number;
  isLoading: boolean;
  pageSizeVariants: number[];
}

export function PaginationButtons({
  pagination,
  setPagination,
  rows,
  isLoading,
  pageSizeVariants,
}: PaginationButtons) {
  return (
    <div className="text-text-xs mt-2 flex items-center justify-center sm:justify-between">
      <div className="hidden text-sm text-text-secondary sm:block">
        <Trans
          i18nKey="pagination.text"
          values={{
            currentPage: pagination.pageIndex + 1,
            totalPages: Math.ceil(rows / pagination.pageSize),
            totalRows: rows,
          }}
        />
      </div>
      <div>
        <Pagination.Root
          page={pagination.pageIndex + 1}
          count={rows}
          pageSize={pagination.pageSize}
          defaultPage={pagination.pageIndex + 1}
          onPageChange={page => {
            setPagination({
              pageIndex: page.page - 1,
              pageSize: page.pageSize,
            });
          }}
        >
          <ButtonGroup variant="ghost" size={'sm'}>
            <Pagination.PrevTrigger asChild>
              <IconButton
                disabled={isLoading}
                className="text-sm text-text-primary"
              >
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={page => (
                <IconButton
                  variant={{ base: 'ghost', _selected: 'outline' }}
                  disabled={isLoading}
                  className="text-sm text-text-primary"
                >
                  {page.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton
                disabled={isLoading}
                className="text-sm text-text-primary"
              >
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </div>
      <div className="hidden sm:block">
        <PageSize
          variants={pageSizeVariants}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div>
  );
}
