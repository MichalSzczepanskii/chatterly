import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { WsJwtStrategy } from '@chatterly/api/events/utils';
import { ApiSharedDataAccessModule } from '@chatterly/api/shared/data-access';
import { ApiEventsDataAccessModule } from '@chatterly/api/events/data-access';

@Module({
  imports: [ApiEventsDataAccessModule, ApiSharedDataAccessModule],
  providers: [EventsGateway, WsJwtStrategy],
})
export class ApiEventsFeatureModule {}
