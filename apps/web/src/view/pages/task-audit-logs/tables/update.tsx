import type { TaskPriority } from '@/app/enums/TaskPriority';
import type { TaskStatus } from '@/app/enums/TaskStatus';
import { formatDateToBR } from '@/app/utils/format-date-br';
import { fieldLabels, priorityLabels, statusLabels } from '@/config/labels';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/view/components/ui/table';

import type { FieldName, TaskAuditLog } from '@challenge/shared';

export function TaskUpdateAuditLogTable({
  taskAuditLogs,
}: {
  taskAuditLogs: TaskAuditLog[];
}) {
  return (
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
        {taskAuditLogs.map(
          ({ taskTitle, fieldName, oldValue, newValue, changedAt }) => (
            <TableRow>
              <TableCell>{taskTitle}</TableCell>
              <TableCell>{fieldLabels[fieldName as FieldName]}</TableCell>
              <TableCell>
                {fieldName === 'priority'
                  ? priorityLabels[oldValue as TaskPriority]
                  : fieldName === 'status'
                    ? statusLabels[oldValue as TaskStatus]
                    : oldValue}
              </TableCell>
              <TableCell>
                {fieldName === 'priority'
                  ? priorityLabels[newValue as TaskPriority]
                  : fieldName === 'status'
                    ? statusLabels[newValue as TaskStatus]
                    : newValue}
              </TableCell>

              <TableCell>{formatDateToBR(changedAt)}</TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}
