const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('carambardb', 'user', 'password', {
    dialect: 'sqlite',
    host: './carambar.sqlite',
});


module.exports = sequelize;