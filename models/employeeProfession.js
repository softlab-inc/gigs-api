/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employeeProfession",
    {
      professionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "profession",
          key: "id",
        },
      },
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "employee",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "employeeProfession",
      timestamps: false,
      indexes: [
        {
          name: "FKemployeePr917718",
          using: "BTREE",
          fields: [{ name: "professionId" }],
        },
        {
          name: "FKemployeePr607259",
          using: "BTREE",
          fields: [{ name: "employeeId" }],
        },
      ],
    }
  );
};
