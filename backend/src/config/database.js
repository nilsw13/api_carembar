import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const dbPath = isProduction
  ? join('/etc/secrets', 'carambar.sqlite')
  : join(__dirname, '..', 'carambar.sqlite');

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: isProduction ? false : console.log
});

// Test de connexion au fichier SQLite
export const testDatabaseConnection = async () => {
  try {
    await sequelize.query('SELECT 1+1');
    console.log('✅ Fichier SQLite accessible');
    return true;
  } catch (error) {
    console.error('❌ Erreur accès SQLite:', error);
    throw error;
  }
};

export const sync = async (options = {}) => {
  await sequelize.sync(options);
};