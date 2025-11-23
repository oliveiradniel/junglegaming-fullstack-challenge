import { useDeleteTaskDialog } from './use-delete-task-dialog';

import { formatDateToBR } from '@/app/utils/format-date-br';
import { statusLabels } from '@/config/labels';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

import type { TaskStatus } from '@/app/enums/TaskStatus';

interface DeleteTaskDialogProps {
  task: {
    id: string;
    title: string;
    status: TaskStatus;
    createdAt: Date;
  };
  page: number;
  onClosePopover?: () => void;
}

export function DeleteTaskDialog({
  task,
  page,
  onClosePopover,
}: DeleteTaskDialogProps) {
  const {
    isDeleteTaskDialogOpen,
    isDeleteTaskLoading,
    buttonDeleteTaskDisabled,
    titleConfirmation,
    handleCloseDeleteTaskDialog,
    handleChangeTitleConfirmation,
    handleDeleteTask,
  } = useDeleteTaskDialog({
    taskId: task?.id,
    title: task?.title,
    page,
    onClosePopover,
  });

  return (
    <Dialog
      open={isDeleteTaskDialogOpen}
      onOpenChange={handleCloseDeleteTaskDialog}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-destructive">
            Tem certeza que deseja excluir esta tarefa?
          </DialogTitle>
          <DialogDescription>
            Essa ação não poderá ser desfeita, todos os comentários relacionados
            também serão excluídos.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex flex-col">
          <div>
            <span className="text-muted-foreground">Título:</span>{' '}
            <span className="text-sm">{task.title}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Status:</span>{' '}
            <span className="text-sm">
              {statusLabels[task.status as TaskStatus]}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Criado em:</span>{' '}
            <span className="text-sm">{formatDateToBR(task.createdAt)}</span>
          </div>
        </div>

        <Separator />

        <DialogFooter>
          <form onSubmit={handleDeleteTask} className="w-full space-y-2">
            <Label htmlFor="task-name-for-delete">
              Digite o título da tarefa para continuar.
            </Label>
            <Input
              aria-invalid={true}
              id="task-name-for-delete"
              placeholder={task.title}
              value={titleConfirmation}
              onChange={handleChangeTitleConfirmation}
            />

            <div className="space-y-2">
              <Button
                type="submit"
                variant="destructive"
                disabled={buttonDeleteTaskDisabled || isDeleteTaskLoading}
                isLoading={isDeleteTaskLoading}
                className="w-full"
              >
                Confirmar
              </Button>

              <DialogClose asChild>
                <Button
                  variant="outline"
                  disabled={isDeleteTaskLoading}
                  className="w-full"
                >
                  Cancelar
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
