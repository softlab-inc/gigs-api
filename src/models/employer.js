/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employer', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    companyName: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: {
                args: true,
                msg: 'Oops. Looks like you already have an account with this email address. Please try to login.',
                fields: [sequelize.fn('lower', sequelize.col('email'))]
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'The email you entered is invalid or is already in our system.'
        },
      }
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
      unique: "phone"
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    licenseImageUri: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profileImagUri: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pushToken: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employer',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "phone",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
