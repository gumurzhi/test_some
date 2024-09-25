import { Sequelize } from 'sequelize';
import * as path from 'node:path';
import { CONFIG } from './app.configuration';
const filename = require.main.filename;
const rootDir = filename.substring(0, filename.indexOf('src') - 1);

export const dbClient = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(rootDir, CONFIG.dbPath)
});
