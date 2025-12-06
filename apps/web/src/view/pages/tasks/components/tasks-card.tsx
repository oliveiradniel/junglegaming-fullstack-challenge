import { formatDateToBR } from '@/app/utils/format-date-br';
import { truncateString } from '@/app/utils/truncate-string';

import { Card, CardDescription, CardTitle } from '@/view/components/ui/card';
import { CalendarClock, CalendarPlus, MessageSquare } from 'lucide-react';

import { Separator } from '@/view/components/ui/separator';
import { TaskActionsPopover } from './task-actions-popover';
import { PriorityBadge } from '@/view/components/ui/priority-badge';
import { StatusBadge } from '@/view/components/ui/status-badge';

import type { TaskWithCommentCount } from '@challenge/shared';

interface TasksCardProps {
  filteredTasksList: TaskWithCommentCount[];
}

export function TasksCard({ filteredTasksList }: TasksCardProps) {
  return (
    <div className="animate-fade-in flex flex-wrap gap-2">
      {filteredTasksList.map(
        ({
          id,
          title,
          description,
          term,
          priority,
          status,
          createdAt,
          commentsCount,
        }) => {
          return (
            <Card key={id} className="w-full max-w-[300px] p-4">
              <div className="flex w-full items-center justify-between">
                <CardTitle>{title}</CardTitle>

                <TaskActionsPopover
                  taskId={id}
                  title={title}
                  status={status}
                  createdAt={createdAt}
                />
              </div>
              <CardDescription>
                {truncateString(description, 30)}
              </CardDescription>

              <div>
                <div className="flex justify-between gap-4">
                  <StatusBadge status={status} />

                  <PriorityBadge priority={priority} />
                </div>

                <Separator className="my-3" />

                <div className="flex items-center justify-between">
                  <div className="text-muted-foreground flex items-center gap-2">
                    <CalendarPlus className="size-4" />
                    <span className="text-xs">{formatDateToBR(createdAt)}</span>
                  </div>

                  <div className="text-muted-foreground flex items-center gap-2">
                    <CalendarClock className="size-4" />
                    <span className="text-xs">{formatDateToBR(term)}</span>
                  </div>

                  <div className="text-muted-foreground flex items-center gap-2">
                    <MessageSquare className="size-4" />
                    <span className="text-xs">{commentsCount}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        },
      )}
    </div>
  );
}
