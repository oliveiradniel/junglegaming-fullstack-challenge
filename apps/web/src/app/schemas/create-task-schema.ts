import * as z from 'zod';

import { TaskPriorityValues } from '../enums/TaskPriority';
import { TaskStatusValues } from '../enums/TaskStatus';

export const CreateTaskSchema = z.object({
  title: z
    .string({ error: 'Informe um título válido.' })
    .min(1, { error: 'O título da tarefa é obrigatória.' }),
  description: z
    .string({ error: 'Informe uma descrição válida.' })
    .min(1, { error: 'A descrição da tarefa é obrigatória.' }),
  term: z
    .date({ error: 'Informe uma data válida.' })
    .refine((date) => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
      error: 'A data deve ser hoje ou futura.',
    }),
  priority: z.enum(TaskPriorityValues, {
    error: 'Informe uma prioriade válida.',
  }),
  status: z.enum(TaskStatusValues, { error: 'Informe um status válido.' }),
});
