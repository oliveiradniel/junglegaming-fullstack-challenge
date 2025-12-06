import { statusLabels } from '@/config/labels';
import { cn } from '@/lib/utils';

import type { TaskStatus } from '@/app/enums/TaskStatus';

export function StatusBadge({ status }: { status: TaskStatus }) {
  const parsedStatus = statusLabels[status];

  return (
    <div
      className={cn(
        'rounded-md px-3 py-2 text-center text-sm font-medium text-white opacity-100!',
        status === 'TODO' && 'bg-yellow-400',
        status === 'IN_PROGRESS' && 'bg-blue-400',
        status === 'REVIEW' && 'bg-purple-400',
        status === 'DONE' && 'bg-green-400',
      )}
    >
      {parsedStatus}
    </div>
  );
}
