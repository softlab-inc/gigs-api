/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee', {
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
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "email"
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profileImage: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nationalId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    professionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'profession',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'employee',
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
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "FKemployee288982",
        using: "BTREE",
        fields: [
          { name: "professionId" },
        ]
      },
    ]
  });
};
