/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "profession",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: true,
        unique: "name"
      }
    },
    {
      sequelize,
      tableName: "profession",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }]
        },
        {
          name: "name",
          unique: true,
          using: "BTREE",
          fields: [{ name: "name" }]
        }
      ]
    }
  );
};
