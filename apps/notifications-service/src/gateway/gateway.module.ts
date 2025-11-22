import { Global, Module } from '@nestjs/common';

import { NotificationsGateway } from './notifications.gateway';

@Global()
@Module({
  providers: [NotificationsGateway],
  exports: [NotificationsGateway],
})
export class GatewayModule {}
