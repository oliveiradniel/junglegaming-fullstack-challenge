import { cn } from '@/lib/utils';
import { CircleCheck, CircleX, Info, Trash2 } from 'lucide-react';
import { toast as sonnerToast } from 'sonner';

export interface CustomToastProps {
  id: string | number;
  type: 'success' | 'error' | 'successful-delete' | 'info';
  description: string;
}

export function CustomToast({ id, type, description }: CustomToastProps) {
  return (
    <button
      type="button"
      onClick={() => sonnerToast.dismiss(id)}
      className="bg-muted relative flex items-center gap-4 overflow-hidden rounded-xl border border-white/5 px-4 py-4 backdrop-blur-md"
    >
      {type === 'success' && <CircleCheck className="size-8 text-green-400" />}

      {type === 'error' && <CircleX className="size-8 text-red-400" />}

      {type === 'successful-delete' && (
        <Trash2 className="size-8 text-yellow-400" />
      )}

      {type === 'info' && <Info className="size-8 text-blue-400" />}

      <div
        className={cn(
          'pointer-events-none absolute inset-0 -left-10 h-full w-32 opacity-30 blur-2xl',
          type === 'success' && 'bg-green-500',
          type === 'error' && 'bg-red-500',
          type === 'successful-delete' && 'bg-yellow-500',
          type === 'info' && 'bg-blue-500',
        )}
      />

      <div className="z-10 flex flex-col items-start">
        <span
          className={cn(
            'text-sm font-medium',
            type === 'success' && 'text-green-500',
            type === 'error' && 'text-red-500',
            type === 'successful-delete' && 'text-yellow-500',
            type === 'info' && 'text-blue-500',
          )}
        >
          {type === 'success' && 'Sucesso'}
          {type === 'error' && 'Erro'}
          {type === 'successful-delete' && 'Sucesso'}
          {type === 'info' && 'Informação'}
        </span>

        <span className="text-muted-foreground text-start text-sm">
          {description}
        </span>
      </div>
    </button>
  );
}
