import { Module } from '@nestjs/common';
import { ApiFeatureConfigModule } from '@chatterly/api/feature-config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PgConfiguration, pgConfiguration } from '@chatterly/api/utils-config';

@Module({
  imports: [ApiFeatureConfigModule,
            TypeOrmModule.forRootAsync({
              inject: [pgConfiguration.KEY],
              useFactory: (config: PgConfiguration) => (config as TypeOrmModuleOptions)
            })],
  controllers: [],
  providers: [],
})
export class AppModule {}
