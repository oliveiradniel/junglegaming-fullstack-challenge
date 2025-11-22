import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export function microserviceOptions({
  brokerURL,
}: {
  brokerURL: string;
}): MicroserviceOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [`${brokerURL}`],
      queue: 'tasks-queue',
      queueOptions: { durable: true },
    },
  };
}
