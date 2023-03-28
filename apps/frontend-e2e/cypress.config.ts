import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
dotenv.config();

export default defineConfig({
  e2e: nxE2EPreset(__dirname),
  env: {
    backendUrl: 'http://localhost:3000/api',
    admin_password: process.env['NX_ADMIN'],
  },
});
