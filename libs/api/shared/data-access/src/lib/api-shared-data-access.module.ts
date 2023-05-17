import { Module } from '@nestjs/common';
import { ConnectedClientsService } from './connected-clients.service';

@Module({
  controllers: [],
  providers: [ConnectedClientsService],
  exports: [ConnectedClientsService],
})
export class ApiSharedDataAccessModule {}
