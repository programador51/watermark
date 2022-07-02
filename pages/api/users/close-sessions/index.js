import auth from "middlewares/auth.js";
import { sequelize } from "../../../../sequelize/querys";
import { removeCookies } from "cookies-next";

async function handler(req, res) {
  /**
   * @type {import("middlewares/types").JwtI}
   */
  const { user } = req.body;

  try {
    await sequelize.RefreshToken.destroy({
      where: {
        userId: user.id,
      },
    });

    removeCookies(process.env.ACCESS_TOKEN_NAME, {
      req,
      res,
    });
    removeCookies(process.env.REFRESH_TOKEN_NAME, {
      req,
      res,
    });

    return res.status(200).redirect(process.env.URL_APP);
  } catch (error) {
    res.status(500).json({
      message: "Intenta más tarde",
      cause: error,
    });
  }
}

export default auth(handler, false);
