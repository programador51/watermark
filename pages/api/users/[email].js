import auth from "middlewares/auth.js";
import { sequelize } from "../../../sequelize/querys";

async function handler(req, res) {
  const { email } = req.query;

  try {
    const user = await sequelize.User.findOne({
      where: {
        email,
        logInMethod: "facebook",
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Intenta más tarde",
      cause: error,
    });
  }
}

export default auth(handler, false);
