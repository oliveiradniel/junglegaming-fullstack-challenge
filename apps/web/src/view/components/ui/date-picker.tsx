import { useState } from 'react';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { ChevronDownIcon } from 'lucide-react';
import { Calendar } from './calendar';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  label: string;
  date: Date | undefined;
  hasError: boolean;
  onSelectDate: (date?: Date) => void;
}

export function DatePicker({
  label,
  date,
  hasError,
  onSelectDate,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-3">
      <Label htmlFor="date">{label}</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            onClick={() => setIsOpen(true)}
            className={cn(
              'w-full justify-between font-normal',
              hasError &&
                'ring-destructive/20 dark:aria-invalid:ring-destructive/40 border-destructive',
            )}
          >
            {date ? date?.toLocaleDateString() : 'Selecione uma data'}

            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              onSelectDate(date);
              setIsOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
