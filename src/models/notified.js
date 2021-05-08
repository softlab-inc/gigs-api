/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notified', {
    gigId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'gig',
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
    tableName: 'notified',
    timestamps: false,
    indexes: [
      {
        name: "FKnotified822795",
        using: "BTREE",
        fields: [
          { name: "gigId" },
        ]
      },
      {
        name: "FKnotified98938",
        using: "BTREE",
        fields: [
          { name: "employeeId" },
        ]
      },
    ]
  });
};
