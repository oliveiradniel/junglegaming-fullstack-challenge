import { formatDateToBR } from '@/app/utils/format-date-br';
import { truncateString } from '@/app/utils/truncate-string';

import { Button } from '@/view/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/view/components/ui/popover';
import { PriorityBadge } from '@/view/components/ui/priority-badge';
import { Separator } from '@/view/components/ui/separator';
import { StatusBadge } from '@/view/components/ui/status-badge';

import type { TaskPriority } from '@/app/enums/TaskPriority';
import type { TaskStatus } from '@/app/enums/TaskStatus';

interface TaskDetailsPopoverProps {
  children?: React.ReactNode;
  values: {
    title: string;
    description: string;
    term: Date;
    priority: TaskPriority;
    status: TaskStatus;
  };
  isTaskDeletionAuditLogsLoading?: boolean;
}

export function TaskDetailsPopover({
  children,
  values,
  isTaskDeletionAuditLogsLoading,
}: TaskDetailsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" disabled={isTaskDeletionAuditLogsLoading}>
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

        <span className="text-sm">Prazo: {formatDateToBR(values.term)}</span>

        <div className="mt-2 flex items-center gap-2">
          <PriorityBadge priority={values.priority} />

          <StatusBadge status={values.status} />
        </div>

        {children}
      </PopoverContent>
    </Popover>
  );
}
