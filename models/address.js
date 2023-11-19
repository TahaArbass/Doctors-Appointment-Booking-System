const { DataTypes } = require('sequelize');
const db = require("../db/configSqlz");

const Address = db.define('Address', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  street_address: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },

  city: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  
  country: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
},{
  timestamps: false,
});

module.exports = Address;
