/* jshint indent: 2 */


module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employee",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      fullName: {
        type: DataTypes.STRING(60),
        allowNull: true
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: {
          args: true,
          msg: "Oops. Looks like you already have an account with this email address. Please try to login.",
          fields: [sequelize.fn("lower", sequelize.col("email"))]
        },
        validate: {
          isEmail: {
            args: true,
            msg: "The email you entered is invalid or is already in our system."
          }
        }
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: true
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      profileImagUri: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      documentImageUri: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      nationalIdImageUri: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      pushToken: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: "employee",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }]
        },
        {
          name: "email",
          unique: true,
          using: "BTREE",
          fields: [{ name: "email" }]
        }
      ]
    }
  );
};
