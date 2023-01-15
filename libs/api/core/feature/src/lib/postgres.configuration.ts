import { ConfigType, registerAs } from '@nestjs/config';
import { Inject } from '@nestjs/common';

export const pgConfiguration = registerAs('postgres', () => ({
  type: process.env.NX_DB_TYPE || 'postgres',
  host: process.env.NX_DB_HOST || 'localhost',
  port: Number(process.env.NX_DB_PORT) || 5443,
  username: process.env.NX_DB_USER || 'postgres',
  password: process.env.NX_DB_PASSWORD || 'secret',
  database: process.env.NX_DB_NAME || 'chatterly',
  entities: [],
  autoLoadEntities: true,
  synchronize: true,
}))

export type PgConfiguration = ConfigType<typeof pgConfiguration>
export const InjectPgConfig = () => Inject(pgConfiguration.KEY);
