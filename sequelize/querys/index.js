import { User } from "../../sequelize/users";
import { Customer } from "../../sequelize/customers";
import { RefreshToken } from "../../sequelize/refreshtokens";
import { Album } from "../../sequelize/album";
import { AlbumsEvidence } from "../../sequelize/album/evidence";
import { Media } from "../../sequelize/media";
// import { AlbumsEvidence } from "../../sequelize/album/evidence"

User.hasMany(Customer, {
  foreignKey: "user",
});

RefreshToken.hasOne(User, {
  foreignKey: "id",
});

Album.hasOne(Customer, {
  foreignKey: "id",
  sourceKey: "customerId",
});

Customer.hasOne(Album, {
  foreignKey: "customerId",
  sourceKey: "id",
});

Album.hasOne(User, {
  foreignKey: "id",
});

AlbumsEvidence.hasOne(Album, {
  foreignKey: "id",
  sourceKey: "albumsId",
});

Media.hasOne(Album, {
  foreignKey: "id",
  sourceKey: "uuid",
});

export const sequelize = {
  User,
  RefreshToken,
  Album,
  Customer,
  Media,
  AlbumsEvidence,
};
