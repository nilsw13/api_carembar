const {Sequelize} = require('sequelize');
const path = require('path');


const isProduction = process.env.NODE_ENV === 'production';

const dbPath = isProduction
  ? path.join('/etc/secrets', 'carambar.sqlite')  // Sur Render
  : path.join(__dirname, '..', 'carambar.sqlite'); // En local



const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: isProduction ? false : console.log
});

const testConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log('✅ Connexion à la base de données établie avec succès.');
    } catch (error) {
      console.error('❌ Impossible de se connecter à la base de données:', error);
      throw error;
    }
  };

  module.exports = {
    sequelize,
    testConnection
  };