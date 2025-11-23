import { cn } from '@/lib/utils';
import { Label } from './ui/label';
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from './ui/radio-group';

interface Options {
  id: string;
  value: string;
  label: string;
  noItems: boolean;
}

interface TaskTadioGroupProps {
  options: Options[];
  value: string;
  onValueChange: (value: string) => void;
}

export function TaskRadioGroup({
  options,
  value,
  onValueChange,
}: TaskTadioGroupProps) {
  return (
    <RadioGroup
      defaultValue={options[0].value}
      value={value}
      onValueChange={onValueChange}
    >
      {options.map((option) => (
        <div key={option.id} className="flex items-center gap-2">
          <RadioGroupItem
            id={option.id}
            value={option.value}
            disabled={option.noItems}
            className={cn(option.noItems && 'cursor-default!')}
          >
            <RadioGroupIndicator />
            <Label
              htmlFor={option.id}
              className={cn(
                'font-normal hover:cursor-pointer',
                option.noItems && 'cursor-default!',
              )}
            >
              {option.label}
            </Label>
          </RadioGroupItem>
        </div>
      ))}
    </RadioGroup>
  );
}
