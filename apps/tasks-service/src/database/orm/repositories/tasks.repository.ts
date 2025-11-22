import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { DataSource, ILike, In, Repository } from 'typeorm';

import { TaskEntity } from '../entities/task.entity';
import { UserTaskEntity } from '../entities/users-tasks.entity';
import { TaskMapper } from 'src/modules/tasks/mappers/task.mapper';

import type {
  Pagination,
  CreateTaskData,
  UpdateTaskData,
  Task,
  TaskWithCommentCount,
  ListTasksPagination,
} from '@challenge/shared';

import type { ITasksRepository } from 'src/database/contracts/tasks-repository.contract';
import type { ICommentsRepository } from 'src/database/contracts/comments-repository.contract';

import { COMMENTS_REPOSITORY } from 'src/shared/constants/tokens';

export class TasksRepository implements ITasksRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
    @Inject(COMMENTS_REPOSITORY)
    private readonly commentsRepository: ICommentsRepository,
    private readonly dataSource: DataSource,
  ) {}

  async getById(id: string): Promise<Task | null> {
    const taskEntity = await this.tasksRepository.findOne({
      where: { id },
      relations: ['comments', 'comments.task'],
    });

    return taskEntity ? TaskMapper.toDomain(taskEntity) : null;
  }

  async getByTitle(title: string): Promise<Task | null> {
    const taskEntity = await this.tasksRepository.findOne({
      where: { title: ILike(title) },
    });

    return taskEntity ? TaskMapper.toDomain(taskEntity) : null;
  }

  async list(pagination: Pagination): Promise<ListTasksPagination> {
    const { page, size } = pagination;

    const skip = (page - 1) * size;

    const allTasksCount = await this.tasksRepository.count();

    const listTasks = await this.tasksRepository.find({
      take: size,
      skip,
    });

    const listTasksWithCommentCount: TaskWithCommentCount[] = await Promise.all(
      listTasks.map(async (task) => {
        return {
          ...TaskMapper.toDomainWithoutComments(task),
          commentsCount: await this.commentsRepository.countByTaskId(task.id),
        };
      }),
    );

    const total = allTasksCount;
    const totalPages = Math.ceil(allTasksCount / size);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    return {
      tasks: listTasksWithCommentCount,
      total,
      totalPages,
      hasNext,
      hasPrevious,
    };
  }

  async create(data: CreateTaskData): Promise<Task> {
    const { authorId, title, description, term, priority, status } = data;

    const registeredTask = this.tasksRepository.create({
      authorId,
      title,
      description,
      term,
      priority,
      status,
    });

    const taskEntity = await this.tasksRepository.save(registeredTask);

    return TaskMapper.toDomain(taskEntity);
  }

  async update(id: string, data: UpdateTaskData): Promise<void> {
    const {
      lastEditedBy,
      userIds,
      title,
      description,
      term,
      priority,
      status,
    } = data;

    await this.dataSource.transaction(async (manager) => {
      if (userIds) {
        const currentRelations = await manager.find(UserTaskEntity, {
          where: { taskId: id },
          select: ['userId'],
        });

        const currentUserIds = currentRelations.map(
          (relations) => relations.userId,
        );

        const toAdd = userIds.filter(
          (userId) => !currentUserIds.includes(userId),
        );
        const toRemove = currentUserIds.filter(
          (userId) => !userIds.includes(userId),
        );

        if (toAdd.length > 0) {
          const usersTask = toAdd.map((userId) =>
            manager.create(UserTaskEntity, {
              taskId: id,
              userId,
            }),
          );

          await manager.save(UserTaskEntity, usersTask);
        }

        if (toRemove.length > 0) {
          await manager.delete(UserTaskEntity, {
            taskId: id,
            userId: In(toRemove),
          });
        }
      }

      await manager.update(TaskEntity, id, {
        lastEditedBy,
        title,
        description,
        term,
        priority,
        status,
      });
    });
  }

  async delete(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
