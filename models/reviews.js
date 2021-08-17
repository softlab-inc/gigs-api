/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "reviews",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ratingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "rating",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "reviews",
      timestamps: true,
      indexes: [
        {
          name: "FKreviews610743",
          using: "BTREE",
          fields: [{ name: "ratingId" }],
        },
      ],
    }
  );
};
