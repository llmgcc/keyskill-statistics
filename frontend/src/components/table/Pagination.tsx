import { Button } from '@radix-ui/themes';
import { Trans, useTranslation } from 'react-i18next';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import { useScreenSize } from '@/hooks/useScreenSize';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '../ui/AppSelect';

interface PaginationProps {
  totalRows: number;
  pageSize: number;
  pageIndex: number;
  onPageChange?: (page: number, pageSize: number) => void;
  pages: number[];
}

export function Pagination({
  totalRows,
  pageSize,
  pageIndex,
  onPageChange,
  pages,
}: PaginationProps) {
  const { isMobile } = useScreenSize();
  const totalPages = Math.ceil(totalRows / pageSize);
  const { t } = useTranslation();

  const handlePageChange = (page: number, newPageSize?: number) => {
    if (page >= 0 && page < totalPages) {
      onPageChange?.(page, newPageSize ?? pageSize);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = isMobile ? 3 : 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(0);

      let start = Math.max(1, pageIndex - 1);
      const end = Math.min(start + maxVisiblePages - 2, totalPages - 1);

      if (end === totalPages - 1) {
        start = Math.max(1, end - (maxVisiblePages - 2));
      }

      if (start > 1) {
        pages.push(-1);
      }

      for (let i = start; i < end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push(-1);
      }

      pages.push(totalPages - 1);
    }

    return pages;
  };

  function renderPaginationButtons() {
    return (
      <div className="flex items-center justify-center gap-1 py-4 text-sm">
        <div>
          <Button
            variant="ghost"
            disabled={pageIndex === 0}
            onClick={() => handlePageChange(pageIndex - 1)}
            className={`m-0 px-2 py-2 ${pageIndex === 0 ? '' : 'cursor-pointer text-text-primary hover:bg-background-accent hover:text-white'}`}
            size={isMobile ? '1' : '2'}
          >
            <BiChevronLeft size={20} />
          </Button>
        </div>

        {getPageNumbers().map(pageNum =>
          pageNum === -1 ? (
            <div key={`dots-${Math.random()}`}>
              <span className="px-2">...</span>
            </div>
          ) : (
            <div key={pageNum}>
              <Button
                variant="ghost"
                onClick={() => handlePageChange(pageNum)}
                className={`m-0 cursor-pointer px-4 py-2 ${pageIndex === pageNum ? 'bg-background-accent text-white' : 'bg-background-primary text-text-primary hover:bg-background-accent hover:text-white'}`}
                size={isMobile ? '1' : '2'}
              >
                {pageNum + 1}
              </Button>
            </div>
          )
        )}

        <div>
          <Button
            variant="ghost"
            disabled={pageIndex === totalPages - 1}
            onClick={() => handlePageChange(pageIndex + 1)}
            className={`m-0 px-2 py-2 ${pageIndex === totalPages - 1 ? '' : 'cursor-pointer text-text-primary hover:bg-background-accent hover:text-white'}`}
            size={isMobile ? '1' : '2'}
          >
            <BiChevronRight size={20} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center ${isMobile ? 'justify-center' : 'justify-between'} `}
    >
      {!isMobile && (
        <div className="text-sm text-text-secondary">
          <Trans
            i18nKey="pagination.text"
            values={{
              currentPage: pageSize * pageIndex + 1,
              totalPages: pageSize * pageIndex + pageSize,
              totalRows: totalRows,
            }}
          />
        </div>
      )}
      <div>{renderPaginationButtons()}</div>
      <div className="flex">
        {!isMobile && (
          <Select
            defaultValue={String(pageSize)}
            onValueChange={v => handlePageChange(0, Number(v))}
          >
            <SelectTrigger>
              <div>
                {t('pagination.show')} {pageSize}
              </div>
            </SelectTrigger>
            <SelectContent>
              {pages.map(p => (
                <SelectItem key={p} value={String(p)}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
