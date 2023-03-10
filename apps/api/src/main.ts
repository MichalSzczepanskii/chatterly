/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { appConfiguration, AppConfiguration } from '@chatterly/api/core-module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const appConfig = app.get<AppConfiguration>(appConfiguration.KEY);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(appConfig.port);
  Logger.log(`🚀 Listening on: ${appConfig.domain}/${globalPrefix}`);
}

bootstrap();
