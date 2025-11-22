export interface UserTask {
  id: string;
  userId: string;
  taskId: string;
  createdAt: Date;
}

export interface Participant {
  id: string;
  email: string;
  username: string;
  assignedAt: Date;
}
