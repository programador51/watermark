import { sequelize } from "../../../sequelize/querys";
import { setCookies } from "cookies-next";

export default async function handler(req, res) {
  // const users = await sequelize.User.findAll({ include: sequelize.Customer });
  try {
    setCookies("test", "secretValue", {
      req,
      res,
      httpOnly: true,
    });

    // console.log(users);

    res.status(200).json({
      bane: "?",
      users: { lol: "hola mundo" },
      // customer,
    });
  } catch (error) {
    res.status(500).json({
      error,
      // customer,
    });
  }
}
