import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { WsJwtStrategy } from '@chatterly/api/events/utils';

@Module({
  providers: [EventsGateway, WsJwtStrategy],
})
export class ApiEventsFeatureModule {}
