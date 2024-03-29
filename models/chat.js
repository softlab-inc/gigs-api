/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "chat",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "employee",
          key: "id",
        },
      },
      employerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "employer",
          key: "id",
        },
      },
      from: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      to: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fullName: {
        type: DataTypes.STRING(60),
        allowNull: true,
      },
      avatar: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "chat",
      timestamps: true,
      indexes: [
        {
          name: "FKchat560094",
          using: "BTREE",
          fields: [{ name: "employeeId" }],
        },
        {
          name: "FKchat572600",
          using: "BTREE",
          fields: [{ name: "employerId" }],
        },
      ],
    }
  );
};
