import { useTasks } from '@/app/hooks/use-tasks';

import { optionsTaskPriority, optionsTaskStatus } from '@/config/options';
import { Filter } from 'lucide-react';

import { Label } from '@/view/components/ui/label';
import { Button } from '@/view/components/ui/button';
import { CheckboxIndicator, CheckboxItem } from '@/view/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/view/components/ui/popover';

import type { TaskPriority } from '@/app/enums/TaskPriority';
import type { TaskStatus } from '@/app/enums/TaskStatus';

export function Filters({ disabled }: { disabled: boolean }) {
  const {
    selectedPriority,
    selectedStatus,
    togglePriorityFilter,
    toggleStatusFilter,
  } = useTasks();

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            aria-label="Abrir filtros"
            disabled={disabled}
            variant="outline"
          >
            Prioridade
            <Filter />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-60">
          <div className="space-y-2">
            {optionsTaskPriority.map(({ id, value, label }) => (
              <div key={id} className="flex items-center gap-2">
                <CheckboxItem
                  checked={selectedPriority.includes(value)}
                  onCheckedChange={(isChecked) =>
                    togglePriorityFilter(isChecked, value as TaskPriority)
                  }
                >
                  <CheckboxIndicator />

                  <Label htmlFor="low">{label}</Label>
                </CheckboxItem>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            aria-label="Abrir filtros"
            disabled={disabled}
            variant="outline"
          >
            Status
            <Filter />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-60">
          <div className="space-y-2">
            {optionsTaskStatus.map(({ id, value, label }) => (
              <div key={id} className="flex items-center gap-2">
                <CheckboxItem
                  checked={selectedStatus.includes(value)}
                  onCheckedChange={(isChecked) =>
                    toggleStatusFilter(isChecked, value as TaskStatus)
                  }
                >
                  <CheckboxIndicator />

                  <Label htmlFor="low">{label}</Label>
                </CheckboxItem>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
