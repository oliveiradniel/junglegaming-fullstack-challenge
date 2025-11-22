export const TaskStatusValues = [
  'TODO',
  'IN_PROGRESS',
  'REVIEW',
  'DONE',
] as const;

export type TaskStatus = (typeof TaskStatusValues)[number];
