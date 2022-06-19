import { DataTypes } from "sequelize";
import db from "../../../sequelize";

export const AlbumsEvidence = db.define(
  "AlbumsEvidence",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    goFileId: {
      type: DataTypes.STRING(65000),
      allowNull: true,
    },
    albumsId: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
