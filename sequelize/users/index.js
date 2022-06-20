import { DataTypes } from "sequelize";
import db from "../../sequelize";

/**
 * @type {import("./types").UserModel}
 */
export const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    defaultWatermark: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    logInMethod: {
      type: DataTypes.ENUM(["facebook"]),
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    subscrption: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Correo inválido",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);
