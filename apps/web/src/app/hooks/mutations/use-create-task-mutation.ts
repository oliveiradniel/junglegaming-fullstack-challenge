import { useAuth } from '../use-auth';
import { useMutation } from '@tanstack/react-query';

import { makeTasksService } from '@/app/factories/make-tasks-service';

import type { CreateTaskData } from '@/types/task-data';

export function useCreateTaskMutation() {
  const tasksService = makeTasksService();

  const { user } = useAuth();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateTaskData) => {
      return tasksService.create({ ...data, authorId: user?.id! });
    },
  });

  return {
    createTask: mutateAsync,
    isCreateTaskLoading: isPending,
  };
}
