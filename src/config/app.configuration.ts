import { config } from 'dotenv';
import { resolve } from 'path';
import * as process from 'node:process';

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
config({ path: resolve(process.cwd(), envFile) });

export const CONFIG = {
  port: process.env.SERVER_PORT || 3001,
  dbPath: process.env.DG_PATH || 'database.sqlite3'
};
