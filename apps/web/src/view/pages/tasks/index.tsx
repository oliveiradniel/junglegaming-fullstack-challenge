import { useTasksController } from './use-tasks-controller';

import { Skeleton } from '../../components/ui/skeleton';
import { NewTaskSheet } from '../../components/new-task-sheet';
import { Header } from './components/header';
import { TasksCard } from './components/tasks-card';
import { Separator } from '@/view/components/ui/separator';
import { EmptyFilteredTasks } from './components/empty-filtered-tasks';
import { EmptyTasks } from './components/empty-tasks';
import { Spinner } from '@/view/components/ui/spinner';

export function Tasks() {
  const {
    startPage,
    pagesToShow,
    page,
    endPage,
    hasPrevious,
    hasNext,
    totalPages,
    isTasksLoading,
    isTasksPending,
    totalTasksCount,
    filteredTasksList,
    searchInput,
    goToPage,
    handlePreviousTasksPage,
    handleNextTasksPage,
    handleChangeSearchInput,
  } = useTasksController();

  return (
    <>
      <NewTaskSheet />

      <div className="flex h-[calc(100%-90px)]">
        <div className="flex h-full w-full flex-col gap-6 p-6">
          <Header
            hasPrevious={hasPrevious}
            hasNext={hasNext}
            startPage={startPage}
            pagesToShow={pagesToShow}
            currentPage={page}
            endPage={endPage}
            totalPages={totalPages}
            searchInput={searchInput}
            filteredTasksList={filteredTasksList}
            isTasksLoading={isTasksLoading}
            goToPage={goToPage}
            totalTasksCount={totalTasksCount}
            handlePreviousTasksPage={handlePreviousTasksPage}
            handleNextTasksPage={handleNextTasksPage}
            handleChangeSearchInput={handleChangeSearchInput}
          />

          <Separator />

          <div className="flex items-center gap-4">
            <h1 className="flex items-baseline gap-2 text-2xl font-medium">
              Todas as tarefas
              {isTasksLoading ? (
                <span className="text-muted-foreground text-[16px]">...</span>
              ) : (
                !isTasksPending && (
                  <span className="text-muted-foreground text-[16px]">
                    ({totalTasksCount ?? 0})
                  </span>
                )
              )}
            </h1>

            {!isTasksLoading && isTasksPending && (
              <Spinner className="text-primary size-6" />
            )}
          </div>

          {isTasksLoading && isTasksPending && (
            <div className="flex flex-wrap gap-2">
              {[...Array(8)].map((_, index) => (
                <Skeleton
                  key={`task-${index}`}
                  className="h-[200px] w-full max-w-[300px] rounded-xl"
                />
              ))}
            </div>
          )}

          {!isTasksLoading && totalTasksCount > 0 && (
            <TasksCard filteredTasksList={filteredTasksList} />
          )}

          {!isTasksLoading && totalTasksCount === 0 && <EmptyTasks />}

          {!isTasksLoading &&
            filteredTasksList.length === 0 &&
            totalTasksCount > 0 && (
              <EmptyFilteredTasks searchInput={searchInput} />
            )}
        </div>
      </div>
    </>
  );
}
