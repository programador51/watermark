import { User } from "../../sequelize/users";
import { Customer } from "../../sequelize/customers";
import { RefreshToken } from "../../sequelize/refreshtokens";
import { Album } from "../../sequelize/album";
import { AlbumsEvidence } from "../../sequelize/album/evidence";

User.hasMany(Customer, {
  foreignKey: "user",
});
// Customer.hasMany(User, {
//   foreignKey: "id",
// });

// Customer.hasMany(Album, {
//   foreignKey: "id",
// });

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
});

export const sequelize = {
  User,
  RefreshToken,
  Album,
  Customer,
};
