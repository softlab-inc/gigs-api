/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gig', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    paymentMethod: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    budget: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hourlyRate: {
      type: DataTypes.DECIMAL(7,2),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    employerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employer',
        key: 'id'
      }
    },
    professionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'profession',
        key: 'id'
      }
    },
    neededBy: {
      type: DataTypes.DATE,
      allowNull: true
    },
    hoursPerDay: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    days: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'gig',
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
        name: "FKgig622562",
        using: "BTREE",
        fields: [
          { name: "employerId" },
        ]
      },
      {
        name: "FKgig79484",
        using: "BTREE",
        fields: [
          { name: "professionId" },
        ]
      },
    ]
  });
};
