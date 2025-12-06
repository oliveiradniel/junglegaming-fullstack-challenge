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
import { fieldLabels } from '@/config/labels';

import { EllipsisIcon, InfoIcon, Trash2Icon } from 'lucide-react';

import { Button } from '@/view/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/view/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/view/components/ui/dropdown-menu';
import { AuthorCell } from '../../author-cell';

import type { ColumnDef } from '@tanstack/react-table';
import type { TaskPriority } from '@/app/enums/TaskPriority';
import type { TaskStatus } from '@/app/enums/TaskStatus';
import type {
  FieldName,
  ListUpdateTaskAuditLogWithAuthorData,
} from '@challenge/shared';
import { PriorityBadge } from '@/view/components/ui/priority-badge';
import { StatusBadge } from '@/view/components/ui/status-badge';

export function useColumns(): ColumnDef<ListUpdateTaskAuditLogWithAuthorData>[] {
  const { taskDeletionAuditLogsList } = useListTaskDeletionAuditLogQuery();

  const { handleOpenDeleteTaskDialog } = useTaskAuditLog();

  const deletedTaskIds = taskDeletionAuditLogsList.map((log) => log.taskId);

  return useMemo<ColumnDef<ListUpdateTaskAuditLogWithAuthorData>[]>(
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
        accessorKey: 'fieldName',
        header: 'Campo',
        cell: ({ row }) => fieldLabels[row.original.fieldName as FieldName],
        meta: {
          nameInFilters: 'Campo',
        },
      },
      {
        accessorKey: 'oldValue',
        header: 'Valor antigo',
        cell: ({ row }) => {
          const oldValue = row.original.oldValue;

          const isFieldNamePriority = row.original.fieldName === 'priority';
          const isFieldNameStatus = row.original.fieldName === 'status';
          const isFieldNameUserIds = row.original.fieldName === 'userIds';

          return isFieldNamePriority ? (
            <PriorityBadge priority={oldValue as TaskPriority} />
          ) : isFieldNameStatus ? (
            <StatusBadge status={oldValue as TaskStatus} />
          ) : isFieldNameUserIds && Array.isArray(oldValue) ? (
            oldValue.length > 0 ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Veja os participantes</Button>
                </PopoverTrigger>

                <PopoverContent>
                  <div className="flex flex-col gap-4">
                    {oldValue.map((user) => (
                      <div key={user.id} className="flex flex-col">
                        <div className="flex justify-between">
                          <span className="text-sm">{user.username}</span>
                          <span className="text-sm">{user.email}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">
                            Usuário desde
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {formatDateToBR(user.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <span className="text-destructive font-medium">
                Sem participantes
              </span>
            )
          ) : (
            oldValue
          );
        },
        meta: {
          nameInFilters: 'Valor antigo',
        },
      },
      {
        accessorKey: 'newValue',
        header: 'Valor atual',
        cell: ({ row }) => {
          const newValue = row.original.newValue;

          const isFieldNamePriority = row.original.fieldName === 'priority';
          const isFieldNameStatus = row.original.fieldName === 'status';
          const isFieldNameUserIds = row.original.fieldName === 'userIds';

          return isFieldNamePriority ? (
            <PriorityBadge priority={newValue as TaskPriority} />
          ) : isFieldNameStatus ? (
            <StatusBadge status={newValue as TaskStatus} />
          ) : isFieldNameUserIds && Array.isArray(newValue) ? (
            newValue.length > 0 ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Veja os participantes</Button>
                </PopoverTrigger>

                <PopoverContent>
                  <div className="flex flex-col gap-4">
                    {newValue.map((user) => (
                      <div key={user.id} className="flex flex-col">
                        <div className="flex justify-between">
                          <span className="text-sm">{user.username}</span>
                          <span className="text-sm">{user.email}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">
                            Usuário desde
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {formatDateToBR(user.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <span className="text-destructive font-medium">
                Sem participantes
              </span>
            )
          ) : (
            newValue
          );
        },
        meta: {
          nameInFilters: 'Valor atual',
        },
      },
      {
        accessorKey: 'changedAt',
        enableGlobalFilter: false,
        header: 'Data/horário da atualização',
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
                  <Button aria-label="Ver opções" variant="ghost" size="sm">
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
                          type: 'update',
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
    [],
  );
}
