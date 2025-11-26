import { useListTaskUpdateAuditLogQuery } from '@/app/hooks/queries/use-list-task-update-audit-log-query';

import {
  formatDateToBR,
  formatDateToBRWithHour,
} from '@/app/utils/format-date-br';
import { fieldLabels, priorityLabels, statusLabels } from '@/config/labels';

import { Skeleton } from '@/view/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/view/components/ui/table';

import type { TaskPriority } from '@/app/enums/TaskPriority';
import type { TaskStatus } from '@/app/enums/TaskStatus';
import type { FieldName } from '@challenge/shared';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/view/components/ui/popover';
import { Button } from '@/view/components/ui/button';

export function TaskUpdateAuditLogTable() {
  const { taskUpdateAuditLogsList, isTaskUpdateAuditLogsLoading } =
    useListTaskUpdateAuditLogQuery();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>

            <TableHead>Campo</TableHead>

            <TableHead>Valor antigo</TableHead>

            <TableHead>Valor atual</TableHead>

            <TableHead>Data de atualização</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {taskUpdateAuditLogsList.map(
            ({ taskTitle, fieldName, oldValue, newValue, changedAt }) => (
              <TableRow>
                <TableCell>{taskTitle}</TableCell>
                <TableCell>{fieldLabels[fieldName as FieldName]}</TableCell>
                <TableCell>
                  {fieldName === 'priority' ? (
                    priorityLabels[oldValue as TaskPriority]
                  ) : fieldName === 'status' ? (
                    statusLabels[oldValue as TaskStatus]
                  ) : fieldName === 'userIds' && Array.isArray(oldValue) ? (
                    oldValue.length > 0 ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            disabled={isTaskUpdateAuditLogsLoading}
                          >
                            Veja os participantes
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent>
                          <div className="flex flex-col gap-4">
                            {oldValue.map((user) => (
                              <div key={user.id} className="flex flex-col">
                                <div className="flex justify-between">
                                  <span className="text-sm">
                                    {user.username}
                                  </span>
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
                      'Vazio'
                    )
                  ) : (
                    oldValue
                  )}
                </TableCell>

                <TableCell>
                  {fieldName === 'priority' ? (
                    priorityLabels[newValue as TaskPriority]
                  ) : fieldName === 'status' ? (
                    statusLabels[newValue as TaskStatus]
                  ) : fieldName === 'userIds' && Array.isArray(newValue) ? (
                    newValue.length > 0 ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            disabled={isTaskUpdateAuditLogsLoading}
                          >
                            Veja os participantes
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent>
                          <div className="flex flex-col gap-4">
                            {newValue.map((user) => (
                              <div key={user.id} className="flex flex-col">
                                <div className="flex justify-between">
                                  <span className="text-sm">
                                    {user.username}
                                  </span>
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
                      'Vazio'
                    )
                  ) : (
                    newValue
                  )}
                </TableCell>

                <TableCell>{formatDateToBRWithHour(changedAt)}</TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>

      {isTaskUpdateAuditLogsLoading && (
        <div className="flex w-full flex-col gap-2">
          {Array.from({ length: 12 }).map(() => (
            <Skeleton className="h-10" />
          ))}
        </div>
      )}
    </>
  );
}
