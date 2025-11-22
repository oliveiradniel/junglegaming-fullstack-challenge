import { TaskPriority, TaskStatus } from 'enums';
import { TaskComment } from './comment.entity';
import { UserWithoutPassword } from './user.entity';

export interface Task {
  id: string;
  authorId: string;
  lastEditedBy: string;
  title: string;
  description: string;
  term: Date;
  priority: TaskPriority;
  status: TaskStatus;
  comments: TaskComment[];
  createdAt: Date;
}

export interface TaskWithParticipants {
  id: string;
  authorId: string;
  lastEditedBy: string;
  title: string;
  description: string;
  term: Date;
  priority: TaskPriority;
  status: TaskStatus;
  comments: TaskComment[];
  createdAt: Date;
  participants: UserWithoutPassword[];
}
