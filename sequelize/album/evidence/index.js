import { DataTypes } from "sequelize";
import db from "../../../sequelize";

export const AlbumsEvidence = db.define(
  "albumsevidence",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    notes: {
      type: DataTypes.TEXT("long"),
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
