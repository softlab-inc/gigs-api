/* jshint indent: 2 */

const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employeeGig",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      likeCount: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      isStarted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      reviewsId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "reviews",
          key: "id"
        }
      },
      gigId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "gig",
          key: "id"
        }
      },
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "employee",
          key: "id"
        }
      }
    },
    {
      sequelize,
      tableName: "employeeGig",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }]
        },
        {
          name: "FKemployeeGi894008",
          using: "BTREE",
          fields: [{ name: "reviewsId" }]
        },
        {
          name: "FKemployeeGi524747",
          using: "BTREE",
          fields: [{ name: "gigId" }]
        },
        {
          name: "FKemployeeGi396986",
          using: "BTREE",
          fields: [{ name: "employeeId" }]
        }
      ]
    }
  );
};
