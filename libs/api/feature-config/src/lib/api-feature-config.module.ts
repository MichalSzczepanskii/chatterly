import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfiguration, pgConfiguration } from '@chatterly/api/utils-config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [appConfiguration, pgConfiguration]
  })]
})
export class ApiFeatureConfigModule {}
