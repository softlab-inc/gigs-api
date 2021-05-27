/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accepted', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pushToken: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fullName: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    isRead: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'id'
      }
    },
    employerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employer',
        key: 'id'
      }
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'accepted',
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
        name: "FKaccepted19704",
        using: "BTREE",
        fields: [
          { name: "employeeId" },
        ]
      },
      {
        name: "FKaccepted7198",
        using: "BTREE",
        fields: [
          { name: "employerId" },
        ]
      },
    ]
  });
};
