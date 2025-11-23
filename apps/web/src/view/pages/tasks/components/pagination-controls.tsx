import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/view/components/ui/pagination';

interface PaginationControlsProps {
  children?: React.ReactNode;
  hasPrevious: boolean;
  hasNext: boolean;
  startPage: number;
  pagesToShow: number[];
  currentPage: number;
  endPage: number;
  totalPages: number;
  itemsCount: number;
  isDisabled: boolean;
  goToPage: (page: number) => void;
  handlePreviousTasksPage: () => void;
  handleNextTasksPage: () => void;
}

export function PaginationControls({
  children,
  hasPrevious,
  hasNext,
  startPage,
  pagesToShow,
  currentPage,
  endPage,
  totalPages,
  itemsCount,
  isDisabled,
  goToPage,
  handlePreviousTasksPage,
  handleNextTasksPage,
}: PaginationControlsProps) {
  return (
    <div className="flex gap-2">
      {itemsCount > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={!hasPrevious || isDisabled}
                onClick={handlePreviousTasksPage}
              />
            </PaginationItem>

            {startPage > 1 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    aria-disabled={isDisabled}
                    onClick={() => goToPage(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                {startPage > 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              </>
            )}

            {pagesToShow.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  aria-disabled={isDisabled}
                  onClick={() => goToPage(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {endPage < totalPages! && (
              <>
                {endPage < totalPages! - 1 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink
                    aria-disabled={isDisabled}
                    onClick={() => goToPage(totalPages!)}
                  >
                    {totalPages!}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                aria-disabled={!hasNext || isDisabled}
                onClick={handleNextTasksPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {children}
    </div>
  );
}
