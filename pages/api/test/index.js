import { sequelize } from "../../../sequelize/querys";

export default async function handler(req, res) {
  const users = await sequelize.User.findAll();

  return res.status(200).json({
    users,
  });
}
