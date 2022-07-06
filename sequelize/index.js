import { Sequelize } from "sequelize";

const db = new Sequelize("onlynudes", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

// const db = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//   }
// );

// const db = new Sequelize(`${process.env.DB_URI}`, {
//   database: process.env.DB_NAME,
//   logging: false,
//   dialect: "mssql",
//   dialectModule: require("mysql2"),
// });

export default db;
