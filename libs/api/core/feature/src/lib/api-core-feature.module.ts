import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfiguration } from './app.configuration';
import { PgConfiguration, pgConfiguration } from './postgres.configuration';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApiUsersFeatureModule } from '@chatterly/api/users/feature';
import { ApiAuthFeatureModule } from '@chatterly/api/auth/feature';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfiguration, pgConfiguration],
      envFilePath: ['.env.local']
    }),
    TypeOrmModule.forRootAsync({
      inject: [pgConfiguration.KEY],
      useFactory: (config: PgConfiguration) => config as TypeOrmModuleOptions,
    }),
    ApiUsersFeatureModule,
    ApiAuthFeatureModule,
  ],
})
export class ApiCoreFeatureModule {}
