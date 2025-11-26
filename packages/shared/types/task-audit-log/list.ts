import { UserWithoutPassword } from "entities";

export interface ListCreationTaskAuditLog {
  id: string;
  taskId: string;
  userId: string;
  taskTitle: string;
  newValue: string;
  changedAt: Date;
}

export interface ListDeletionTaskAuditLog {
  id: string;
  taskId: string;
  userId: string;
  taskTitle: string;
  oldValue: string;
  changedAt: Date;
}

export interface ListUpdateTaskAuditLog {
  id: string;
  taskId: string;
  userId: string;
  taskTitle: string;
  fieldName: string;
  oldValue: string | UserWithoutPassword[];
  newValue: string | UserWithoutPassword[];
  changedAt: Date;
}
