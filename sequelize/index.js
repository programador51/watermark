import { Sequelize } from "sequelize";

const db = new Sequelize("onlynudes", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: true,
});

export default db;
