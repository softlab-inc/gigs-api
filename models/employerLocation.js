/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employerLocation', {
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
    employerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employer',
        key: 'id'
      }
    },
    districtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'district',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'employerLocation',
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
        name: "FKemployerLo337508",
        using: "BTREE",
        fields: [
          { name: "employerId" },
        ]
      },
      {
        name: "FKemployerLo867888",
        using: "BTREE",
        fields: [
          { name: "districtId" },
        ]
      },
    ]
  });
};
