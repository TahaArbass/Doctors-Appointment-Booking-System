const { DataTypes } = require('sequelize');
const db = require("../db/configSqlz");
const bcrypt = require('bcrypt');

const Address = require('./address');

const Doctor = db.define('Doctor', {

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

  clinic_address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

},

  {
    //make sure to hash before inserting into database
    
    hooks: {
      beforeCreate: async (doctor) => {
        if (doctor.password) {
          const salt = await bcrypt.genSalt();
          doctor.password = await bcrypt.hash(doctor.password, salt);
        }
      },
      beforeUpdate: async (doctor) => {
        if (doctor.password) {
          const salt = await bcrypt.genSalt();
          patient.password = await bcrypt.hash(doctor.password, salt);
        }
      }
    },

    timestamps: false,
  });

// foreign key to address table
Doctor.belongsTo(Address, { foreignKey: 'clinic_address_id' });


module.exports = Doctor;
