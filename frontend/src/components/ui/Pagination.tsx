import { useMemo } from 'react';
import { Button, Flex } from '@radix-ui/themes';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
  isLoading?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = '',
  isLoading = false,
}: PaginationProps) => {
  const paginationRange = useMemo(() => {
    const generateRange = () => {
      if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPages,
      );

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * siblingCount;
        return [
          ...Array.from({ length: leftItemCount }, (_, i) => i + 1),
          'dots',
          totalPages,
        ];
      }

      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * siblingCount;
        return [
          1,
          'dots',
          ...Array.from(
            { length: rightItemCount },
            (_, i) => totalPages - rightItemCount + i + 1,
          ),
        ];
      }

      if (shouldShowLeftDots && shouldShowRightDots) {
        return [
          1,
          'dots',
          ...Array.from(
            { length: rightSiblingIndex - leftSiblingIndex + 1 },
            (_, i) => leftSiblingIndex + i,
          ),
          'dots',
          totalPages,
        ];
      }
    };

    return generateRange();
  }, [currentPage, totalPages, siblingCount]);

  if (totalPages <= 1) return null;

  return (
    <nav role="navigation" aria-label="Pagination" className={className}>
      <Flex gap="2" align="center">
        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          isLoading={isLoading}
        >
          <BiChevronLeft aria-hidden="true" />
        </PaginationButton>

        {paginationRange?.map((pageNumber, index) => (
          <PaginationItem
            key={index}
            pageNumber={pageNumber}
            currentPage={currentPage}
            onPageChange={onPageChange}
            isLoading={isLoading}
          />
        ))}

        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          aria-label="Next page"
        >
          <BiChevronRight aria-hidden="true" />
        </PaginationButton>
      </Flex>
    </nav>
  );
};

interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading: boolean;
}

const PaginationButton = ({
  children,
  className = '',
  isLoading = false,
  ...props
}: PaginationButtonProps) => (
  <Button
    variant="soft"
    {...props}
    className={`cursor-pointer bg-background-primary text-text hover:bg-background-secondary disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  >
    {children}
  </Button>
);

interface PaginationItemProps {
  pageNumber: number | string;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

const PaginationItem = ({
  pageNumber,
  currentPage,
  onPageChange,
  isLoading = false,
}: PaginationItemProps) => {
  if (pageNumber === 'dots') {
    return (
      <span className="px-2" aria-hidden="true">
        ...
      </span>
    );
  }

  const isCurrentPage = currentPage === pageNumber;

  return (
    <PaginationButton
      onClick={() => onPageChange(pageNumber as number)}
      aria-current={isCurrentPage ? 'page' : undefined}
      aria-label={`Page ${pageNumber}`}
      className={
        isCurrentPage ? 'bg-background-secondary' : 'bg-background-primary'
      }
      disabled={isLoading}
    >
      {pageNumber}
    </PaginationButton>
  );
};
