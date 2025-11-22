import { useAuth } from '../use-auth';
import { useMutation } from '@tanstack/react-query';

import { makeTasksService } from '@/app/factories/make-tasks-service';

import type { UpdateTaskData } from '@/types/task-data';

export function useUpdateTaskMutation() {
  const tasksService = makeTasksService();

  const { user } = useAuth();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: UpdateTaskData }) =>
      tasksService.update(taskId, { ...data, lastEditedBy: user?.id! }),
  });

  return {
    updateTask: mutateAsync,
    isUpdateTaskLoading: isPending,
  };
}
