import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfiguration } from '@chatterly/api/utils-config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [appConfiguration]
  })]
})
export class ApiFeatureConfigModule {}
