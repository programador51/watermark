import { DataTypes } from "sequelize";
import db from "../../sequelize";

export const Media = db.define(
  "Media",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    albumsId: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    uuid: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
