export const TaskPriorityValues = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const;

export type TaskPriority = (typeof TaskPriorityValues)[number];
