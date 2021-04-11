/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeeProfession', {
    professionid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'profession',
        key: 'id'
      }
    },
    employeeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'employee',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'employeeProfession',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "professionid" },
          { name: "employeeid" },
        ]
      },
      {
        name: "FKemployeePr918710",
        using: "BTREE",
        fields: [
          { name: "professionid" },
        ]
      },
      {
        name: "FKemployeePr608251",
        using: "BTREE",
        fields: [
          { name: "employeeid" },
        ]
      },
    ]
  });
};
