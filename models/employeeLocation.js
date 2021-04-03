/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeeLocation', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    longitude: {
      type: DataTypes.DECIMAL(10,6),
      allowNull: true
    },
    latitude: {
      type: DataTypes.DECIMAL(10,6),
      allowNull: true
    },
    districtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'district',
        key: 'id'
      }
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'employeeLocation',
    timestamps: false,
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
        name: "FKemployeeLo205672",
        using: "BTREE",
        fields: [
          { name: "districtId" },
        ]
      },
      {
        name: "FKemployeeLo723546",
        using: "BTREE",
        fields: [
          { name: "employeeId" },
        ]
      },
    ]
  });
};
