import { ConfigType, registerAs } from '@nestjs/config';
import { Inject } from '@nestjs/common';

export const appConfiguration = registerAs('app', () => ({
  protocol: process.env.APP_PROTOCOL || 'http',
  host: process.env.APP_HOST || 'localhost',
  port: Number(process.env.APP_PORT) || 3000,
  get domain() {
    return `${this.protocol}://${this.host}:${this.port}`;
  }
}))

export type AppConfiguration = ConfigType<typeof appConfiguration>;
export const InjectAppConfig = () => Inject(appConfiguration.KEY);
