import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { CheckCircle2, Circle } from 'lucide-react';

import { cn } from '@/lib/utils';

function RadioGroup({
  children,
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Root>
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.RadioGroupItem
      data-slot="radio-group-item"
      className={cn(
        'group bg-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 focus-visible:primary data-[state=checked]:border-primary ring-primary data-[state=checked]:bg-primary/20 border-input outline-nonefocus-visible:ring-4 text-secondary-foreground font-regular flex w-full shrink-0 cursor-pointer items-center justify-between rounded-md border px-4 py-2.5 shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

function RadioGroupIndicator() {
  return (
    <>
      <Circle className="text-input size-4 group-data-[state=checked]:hidden" />
      <CheckCircle2 className="text-primary hidden size-4 group-data-[state=checked]:inline" />
    </>
  );
}

export { RadioGroup, RadioGroupItem, RadioGroupIndicator };
