import { Sequelize } from "sequelize";

const db = new Sequelize("onlynudes", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: true,
});

export default db;

// eslint-disable-next-line import/no-anonymous-default-export
// export default async function () {
//   try {
//     const sequelize = await db.authenticate();
//     return sequelize;
//   } catch (error) {
//     throw error;
//   }
// }
