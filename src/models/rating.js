/* jshint indent: 2 */

const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "rating",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      tag: {
        type: DataTypes.STRING(15),
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: "rating",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }]
        }
      ]
    }
  );
};
