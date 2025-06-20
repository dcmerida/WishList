const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lista_deseos', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;