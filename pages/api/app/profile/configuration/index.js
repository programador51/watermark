import auth from "middlewares/auth.js";
// import { RefreshToken } from "sequelize/refreshtokens";
import { sequelize } from "../../../../../sequelize/querys";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).json({
      message: "Solo se permite metodo HTTP PUT",
    });
  }
  /**
   * @type {import("helpers/apis/configuration/types").DtoUpdateProfileServer}
   */
  const { profile, user } = req.body;

  await sequelize.User.update(
    {
      goFileToken: profile.goFileToken,
    },
    {
      where: {
        id: user.id,
      },
    }
  );

  return res.status(200).json({
    message: "Configuracion actualizada",
  });
}

export default auth(handler);
