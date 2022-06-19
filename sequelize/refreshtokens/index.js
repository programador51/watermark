import { DataTypes } from "sequelize";
import db from "../../sequelize";

export const RefreshToken = db.define(
  "RefreshToken",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    browser: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    deviceVersion: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    ip: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    loginDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);
