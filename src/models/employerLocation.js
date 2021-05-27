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
      allowNull: false
    },
    districtId: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    ]
  });
};
