import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import {
  NotifyAssignedTask,
  NotifyCreatedTask,
  NotifyDeletedTask,
  NotifyNewComment,
  NotifyUpdatedTask,
  NotifyUpdatedTaskPriority,
  NotifyUpdatedTaskStatus,
  NotifyUser,
} from './types/notify';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private clients = new Map<string, Socket>();

  handleConnection(client: Socket) {
    const userId = client.handshake.auth.userId as string;

    if (!userId) {
      client.disconnect();
      return;
    }

    this.clients.set(userId, client);
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.auth.userId as string;

    this.clients.delete(userId);
  }

  notifyUser({ userId, event, data }: NotifyUser) {
    const client = this.clients.get(userId);
    if (client) {
      client.emit(event, data);
    }
  }

  notifyCreatedTask({ data }: NotifyCreatedTask) {
    const { authorId } = data;

    this.clients.forEach((client, userId) => {
      if (userId !== authorId) {
        client.emit('task:created', data);
      }
    });
  }

  notifyUpdatedTask({ data }: NotifyUpdatedTask) {
    const { fullTask } = data;
    const lastEditedBy = fullTask.lastEditedBy;

    this.clients.forEach((client, userId) => {
      if (userId !== lastEditedBy) {
        client.emit('task:updated', data);
      }
    });
  }

  notifyUpdatedTaskStatus({ data }: NotifyUpdatedTaskStatus) {
    const { lastEditedBy } = data;

    this.clients.forEach((client, userId) => {
      if (userId !== lastEditedBy) {
        client.emit('task:status', data);
      }
    });
  }

  notifyUpdatedTaskPriority({ data }: NotifyUpdatedTaskPriority) {
    const { lastEditedBy } = data;

    this.clients.forEach((client, userId) => {
      if (userId !== lastEditedBy) {
        client.emit('task:priority', data);
      }
    });
  }

  notifyAssignedUsers({ data }: NotifyAssignedTask) {
    const { fullTask } = data;
    const lastEditedBy = fullTask.lastEditedBy;

    this.clients.forEach((client, userId) => {
      if (userId !== lastEditedBy) {
        client.emit('task:assigned', data);
      }
    });
  }

  notifyDeletedTask({ data }: NotifyDeletedTask) {
    const { deletedBy } = data;

    this.clients.forEach((client, userId) => {
      if (userId !== deletedBy) {
        client.emit('task:deleted', data);
      }
    });
  }

  notifyNewComment({ data }: NotifyNewComment) {
    const { comment } = data;

    this.clients.forEach((client, userId) => {
      if (userId !== comment.authorId) {
        client.emit('comment:new', data);
      }
    });
  }
}
