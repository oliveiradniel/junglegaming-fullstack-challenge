import { cn } from '@/lib/utils';
import { formatDateToBR } from '@/app/utils/format-date-br';
import { truncateString } from '@/app/utils/truncate-string';

import { priorityLabels, statusLabels } from '../labels';

import { Card, CardDescription, CardTitle } from '@/view/components/ui/card';
import { CalendarClock, CalendarPlus, Flag, MessageSquare } from 'lucide-react';

import { Separator } from '@/view/components/ui/separator';
import { TaskActionsPopover } from './task-actions-popover';

import type { TaskStatus } from '@/app/enums/TaskStatus';
import type { TaskWithCommentCount } from '@challenge/shared';
import type { TaskPriority } from '@/app/enums/TaskPriority';

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
                <div>{truncateString(description, 30)}</div>
              </CardDescription>

              <div>
                <div className="flex justify-between gap-4">
                  <span
                    className={cn(
                      'rounded-sm p-2 text-xs font-bold text-white',
                      status === 'TODO' && 'bg-yellow-400',
                      status === 'IN_PROGRESS' && 'bg-blue-400',
                      status === 'REVIEW' && 'bg-purple-400',
                      status === 'DONE' && 'bg-green-400',
                    )}
                  >
                    {statusLabels[status as TaskStatus]}
                  </span>

                  <div
                    className={cn(
                      'flex items-center gap-2',
                      priority === 'LOW' && 'text-green-400',
                      priority === 'MEDIUM' && 'text-blue-400',
                      priority === 'HIGH' && 'text-yellow-400',
                      priority === 'URGENT' && 'text-red-400',
                    )}
                  >
                    <Flag className="size-4" />
                    <span className="text-xs font-medium">
                      {priorityLabels[priority as TaskPriority]}
                    </span>
                  </div>
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
