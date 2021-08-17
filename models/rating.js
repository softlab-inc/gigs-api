/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "rating",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tag: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "rating",
      timestamps: false,
    }
  );
};
