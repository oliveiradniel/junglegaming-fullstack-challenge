import { useState } from 'react';
import { useListTaskAuditLogsQuery } from '@/app/hooks/queries/use-list-task-audit-logs-query';

import { Filter } from 'lucide-react';

import { TaskRadioGroup } from '@/view/components/task-radio-group';
import { Button } from '@/view/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/view/components/ui/popover';
import { TaskCreateAuditLogTable } from './tables/create';
import { TaskUpdateAuditLogTable } from './tables/update';
import { TaskDeleteAuditLogTable } from './tables/delete';

type FilterType = 'CREATE' | 'UPDATE' | 'DELETE';

export function TaskAuditLogs() {
  const { taskAuditLogsList, isTaskAuditLogsLoading } =
    useListTaskAuditLogsQuery();

  const [filterActionSelected, setFilterActionSelected] =
    useState<FilterType>('CREATE');

  const filteredTaskAuditLogs = taskAuditLogsList.filter(
    (taskAuditLog) => taskAuditLog.action === filterActionSelected,
  );

  const deletedTaskIds = taskAuditLogsList
    .filter((taskAuditLog) => taskAuditLog.action === 'DELETE')
    .map((taskAuditLog) => taskAuditLog.taskId);

  const optionsTaskAuditLogFilterAction = [
    {
      id: crypto.randomUUID(),
      value: 'CREATE',
      label: 'Crição',
      noItems:
        taskAuditLogsList.filter(
          (taskAuditLog) => taskAuditLog.action === 'CREATE',
        ).length === 0,
    },
    {
      id: crypto.randomUUID(),
      value: 'UPDATE',
      label: 'Atualização',
      noItems:
        taskAuditLogsList.filter(
          (taskAuditLog) => taskAuditLog.action === 'UPDATE',
        ).length === 0,
    },
    {
      id: crypto.randomUUID(),
      value: 'DELETE',
      label: 'Exclusão',
      noItems:
        taskAuditLogsList.filter(
          (taskAuditLog) => taskAuditLog.action === 'DELETE',
        ).length === 0,
    },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-6 p-6">
      <h1 className="text-2xl">
        {filterActionSelected === 'CREATE' && 'Criações de tarefas'}
        {filterActionSelected === 'UPDATE' && 'Alteração de tarefas'}
        {filterActionSelected === 'DELETE' && 'Exclusão de tarefas'}
      </h1>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            aria-label="Abrir filtros"
            disabled={false}
            variant="outline"
            className="max-w-60"
          >
            Filtrar pelo tipo de ação
            <Filter />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-60">
          <div className="space-y-2">
            <TaskRadioGroup
              options={optionsTaskAuditLogFilterAction}
              value={filterActionSelected}
              onValueChange={(option) =>
                setFilterActionSelected(option as FilterType)
              }
            />
          </div>
        </PopoverContent>
      </Popover>

      {filterActionSelected === 'CREATE' && (
        <TaskCreateAuditLogTable
          taskAuditLogs={filteredTaskAuditLogs}
          deletedTaskIds={deletedTaskIds}
        />
      )}
      {filterActionSelected === 'UPDATE' && (
        <TaskUpdateAuditLogTable taskAuditLogs={filteredTaskAuditLogs} />
      )}
      {filterActionSelected === 'DELETE' && (
        <TaskDeleteAuditLogTable taskAuditLogs={filteredTaskAuditLogs} />
      )}
    </div>
  );
}
