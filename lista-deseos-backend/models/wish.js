const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Deseo = sequelize.define('Deseo', {
  imagen_url: {
    type: DataTypes.TEXT,
    allowNull: true,
  },  
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  enlace: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

module.exports = Deseo;
