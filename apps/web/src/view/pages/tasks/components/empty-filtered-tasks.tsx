import { useTasks } from '@/app/hooks/use-tasks';

import filteredTasksNotFoundImage from '@/assets/images/filtered-tasks-not-found.svg';

import { priorityLabels, statusLabels } from '@/config/labels';

interface EmptyFilteredTasksProps {
  searchInput: string;
}

export function EmptyFilteredTasks({ searchInput }: EmptyFilteredTasksProps) {
  const { selectedPriority, selectedStatus } = useTasks();

  const parsedStatusFilters = selectedStatus.map(
    (status) => statusLabels[status],
  );
  const parsedPriorityFilters = selectedPriority.map(
    (priority) => priorityLabels[priority],
  );

  return (
    <div className="animate-fade-in flex h-full flex-col items-center justify-center gap-6">
      <img src={filteredTasksNotFoundImage} alt="" className="h-60" />

      <div className="flex flex-col gap-4">
        <span>Não foi possível encontrar nenhuma tarefa com:</span>

        <div>
          {searchInput.length > 0 && (
            <span className="text-sm">
              O título:{' '}
              <span className="text-primary font-medium">"{searchInput}"</span>
            </span>
          )}

          {selectedPriority.length > 0 && (
            <div className="flex gap-2 text-sm">
              Com {selectedPriority.length === 1 ? 'o filtro' : 'os filtros'} de
              prioridade:{' '}
              <div className="flex gap-2">
                {parsedPriorityFilters.map((filter) => (
                  <span className="text-primary font-medium">{filter}</span>
                ))}
              </div>
            </div>
          )}

          {selectedStatus.length > 0 && (
            <div className="flex gap-2 text-sm">
              Com {selectedStatus.length === 1 ? 'o filtro' : 'os filtros'} de
              status:{' '}
              <div className="flex gap-2">
                {parsedStatusFilters.map((filter) => (
                  <span className="text-primary font-medium">{filter}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <Button onClick={() => navigate({ from: '/my-tasks' })}>
        <Library /> Minhas tarefas
      </Button> */}
    </div>
  );
}
