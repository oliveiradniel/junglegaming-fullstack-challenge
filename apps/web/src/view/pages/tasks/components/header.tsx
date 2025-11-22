import { useTasks } from '@/app/hooks/use-tasks';

import { Filter, Search } from 'lucide-react';
import {
  optionsTaskPriority,
  optionsTaskStatus,
} from '@/app/constants/options';

import { Button } from '@/view/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/view/components/ui/pagination';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/view/components/ui/input-group';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/view/components/ui/popover';
import { CheckboxIndicator, CheckboxItem } from '@/view/components/ui/checkbox';
import { Label } from '@/view/components/ui/label';

import type { TaskStatus } from '@/app/enums/TaskStatus';
import type { TaskPriority } from '@/app/enums/TaskPriority';
import type { TaskWithCommentCount } from '@challenge/shared';

interface HeaderProps {
  hasPrevious: boolean;
  hasNext: boolean;
  startPage: number;
  pagesToShow: number[];
  currentPage: number;
  endPage: number;
  totalPages: number;
  searchInput: string;
  totalTasksCount: number;
  filteredTasksList: TaskWithCommentCount[];
  isTasksLoading: boolean;
  handleChangeSearchInput: (value: string) => void;
  goToPage: (page: number) => void;
  handlePreviousTasksPage: () => void;
  handleNextTasksPage: () => void;
}

export function Header({
  startPage,
  pagesToShow,
  endPage,
  hasPrevious,
  hasNext,
  currentPage,
  totalPages,
  searchInput,
  filteredTasksList,
  isTasksLoading,
  totalTasksCount,
  handleChangeSearchInput,
  goToPage,
  handlePreviousTasksPage,
  handleNextTasksPage,
}: HeaderProps) {
  const {
    selectedPriority,
    selectedStatus,
    togglePriorityFilter,
    toggleStatusFilter,
  } = useTasks();

  return (
    <header className="flex flex-col items-start justify-between gap-2 xl:flex-row">
      <InputGroup className="w-full max-w-[480px]">
        <InputGroupInput
          disabled={isTasksLoading || totalTasksCount === 0}
          placeholder="Digite o título de uma tarefa"
          value={searchInput}
          onChange={(event) => handleChangeSearchInput(event.target.value)}
          className="w-full pl-10"
        />

        <InputGroupAddon>
          <Search className="size-4" />
        </InputGroupAddon>

        {searchInput.length > 0 && (
          <InputGroupAddon align="inline-end" className="animate-fade-in">
            ({filteredTasksList.length})
          </InputGroupAddon>
        )}
      </InputGroup>

      <div className="flex gap-2">
        {totalTasksCount > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  aria-disabled={!hasPrevious || isTasksLoading}
                  onClick={handlePreviousTasksPage}
                />
              </PaginationItem>

              {startPage > 1 && (
                <>
                  <PaginationItem>
                    <PaginationLink
                      aria-disabled={isTasksLoading}
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
                    aria-disabled={isTasksLoading}
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
                      aria-disabled={isTasksLoading}
                      onClick={() => goToPage(totalPages!)}
                    >
                      {totalPages!}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  aria-disabled={!hasNext || isTasksLoading}
                  onClick={handleNextTasksPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        <Popover>
          <PopoverTrigger asChild>
            <Button
              aria-label="Abrir filtros"
              disabled={isTasksLoading || totalTasksCount === 0}
              variant="outline"
            >
              Prioridade
              <Filter />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-60">
            <div className="space-y-2">
              {optionsTaskPriority.map(({ id, value, label }) => (
                <div key={id} className="flex items-center gap-2">
                  <CheckboxItem
                    checked={selectedPriority.includes(value)}
                    onCheckedChange={(isChecked) =>
                      togglePriorityFilter(isChecked, value as TaskPriority)
                    }
                  >
                    <CheckboxIndicator />

                    <Label htmlFor="low">{label}</Label>
                  </CheckboxItem>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              aria-label="Abrir filtros"
              disabled={isTasksLoading || totalTasksCount === 0}
              variant="outline"
            >
              Status
              <Filter />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-60">
            <div className="space-y-2">
              {optionsTaskStatus.map(({ id, value, label }) => (
                <div key={id} className="flex items-center gap-2">
                  <CheckboxItem
                    checked={selectedStatus.includes(value)}
                    onCheckedChange={(isChecked) =>
                      toggleStatusFilter(isChecked, value as TaskStatus)
                    }
                  >
                    <CheckboxIndicator />

                    <Label htmlFor="low">{label}</Label>
                  </CheckboxItem>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
