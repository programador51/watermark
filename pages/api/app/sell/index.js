// import { sequelize } from "../../../../sequelize/querys";
// import { setCookies } from "cookies-next";
import { sequelize } from "../../../../sequelize/querys";
import auth from "middlewares/auth.js";

async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(400).json({
        message: "Solo se aceptan peticiones POST",
        wasCreated: false,
      });
    }

    console.log("Desde controlador", req.body.user);

    sequelize.Album.create({
      id: "??",
      userId: req.body.user.id,
      creationDate: new Date(),
      customerId: null,
    });

    return res.status(200).json({
      message: "Venta/Album creado",
      wasCreated: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: process.env.ERROR_MESSAGE,
      wasCreated: false,
    });
  }
}

export default auth(handler);
