import { Link } from '@tanstack/react-router';

import { useMemo } from 'react';
import { useListTaskDeletionAuditLogQuery } from '@/app/hooks/queries/use-list-task-deletion-audit-log-query';
import { useTaskAuditLog } from '../../context/use-task-audit-log';

import { cn } from '@/lib/utils';
import { truncateString } from '@/app/utils/truncate-string';
import {
  formatDateToBR,
  formatDateToBRWithHour,
} from '@/app/utils/format-date-br';
import { statusLabels } from '@/config/labels';

import { EllipsisIcon, InfoIcon, Trash2Icon } from 'lucide-react';

import { Button } from '@/view/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/view/components/ui/popover';
import { Separator } from '@/view/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/view/components/ui/dropdown-menu';
import { AuthorCell } from '../../author-cell';
import { PriorityBadge } from '@/view/components/ui/priority-badge';

import type { ColumnDef } from '@tanstack/react-table';
import type { TaskStatus } from '@/app/enums/TaskStatus';
import type { ListCreationTaskAuditLogWithAuthorData } from '@challenge/shared';

export function useColumns(): ColumnDef<ListCreationTaskAuditLogWithAuthorData>[] {
  const { taskDeletionAuditLogsList, isTaskDeletionAuditLogsLoading } =
    useListTaskDeletionAuditLogQuery();

  const { handleOpenDeleteTaskDialog } = useTaskAuditLog();

  const deletedTaskIds = taskDeletionAuditLogsList.map((log) => log.taskId);

  return useMemo<ColumnDef<ListCreationTaskAuditLogWithAuthorData>[]>(
    () => [
      {
        id: 'author',
        accessorFn: (row) =>
          `${row.authorData.username} ${row.authorData.email}`,
        header: 'Autor',
        cell: ({ row }) => <AuthorCell row={row} />,
        meta: {
          nameInFilters: 'Autor',
        },
      },
      {
        accessorKey: 'taskTitle',
        header: 'Título',
        cell: ({ row }) => truncateString(row.original.taskTitle, 40),
        meta: {
          nameInFilters: 'Título',
        },
      },
      {
        accessorKey: 'values',
        header: 'Valores na criação',
        enableGlobalFilter: false,
        cell: ({ row }) => {
          const values = JSON.parse(row.original.values);
          const thisTaskDeleted = deletedTaskIds.includes(row.original.taskId);

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  disabled={isTaskDeletionAuditLogsLoading}
                >
                  Veja os valores
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex items-center justify-between text-sm">
                  <span>Título:</span>
                  <span>{truncateString(values.title, 20)}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span>Descrição:</span>
                  <span>{truncateString(values.description, 20)}</span>
                </div>

                <Separator className="my-2" />

                <span className="text-sm">
                  Prazo: {formatDateToBR(values.term)}
                </span>

                <div className="mt-2 flex items-center gap-2">
                  <PriorityBadge priority={values.priority} />

                  <span
                    className={cn(
                      'rounded-md px-3 py-2 text-sm font-medium text-white',
                      values.status === 'TODO' && 'bg-yellow-400',
                      values.status === 'IN_PROGRESS' && 'bg-blue-400',
                      values.status === 'REVIEW' && 'bg-purple-400',
                      values.status === 'DONE' && 'bg-green-400',
                    )}
                  >
                    {statusLabels[values.status as TaskStatus]}
                  </span>
                </div>

                <Button
                  disabled={isTaskDeletionAuditLogsLoading || thisTaskDeleted}
                  variant={thisTaskDeleted ? 'destructive' : 'default'}
                  className="mt-4 w-full"
                >
                  <Link to="/tasks/$taskId" params={{ taskId: values.id }}>
                    {thisTaskDeleted ? 'Indisponível' : 'Ver informações'}
                  </Link>
                </Button>
              </PopoverContent>
            </Popover>
          );
        },
        meta: {
          nameInFilters: 'Valores',
        },
      },
      {
        accessorKey: 'changedAt',
        header: 'Data/horário da criação',
        enableGlobalFilter: false,
        cell: ({ row }) => formatDateToBRWithHour(row.original.changedAt),
        meta: {
          nameInFilters: 'Data/horário',
        },
      },
      {
        id: 'Actions',
        enableHiding: false,
        enableGlobalFilter: false,
        cell: ({ row }) => {
          const thisTaskDeleted = deletedTaskIds.includes(row.original.taskId);

          return (
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="sm">
                    <EllipsisIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <div>
                    {!thisTaskDeleted && (
                      <Button
                        asChild
                        variant="ghost"
                        className={cn('w-full font-normal')}
                      >
                        <Link
                          to="/tasks/$taskId"
                          params={{ taskId: row.original.taskId }}
                        >
                          <div className="flex items-center gap-2">
                            <InfoIcon className="size-4 text-blue-400" />
                            Ver tarefa
                          </div>
                        </Link>
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      onClick={() =>
                        handleOpenDeleteTaskDialog({
                          selectedLogId: row.original.id,
                          type: 'creation',
                        })
                      }
                      className="flex w-full items-center gap-2 font-normal"
                    >
                      <Trash2Icon className="size-4 text-red-400" />
                      Excluir log
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [isTaskDeletionAuditLogsLoading],
  );
}
