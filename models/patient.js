const { DataTypes } = require('sequelize');
const db = require("../db/configSqlz");
const Address = require('./address'); 

const Patient = db.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
}, {
  timestamps: false,
});


Patient.belongsTo(Address, { foreignKey: 'address_id' });


module.exports = Patient;
