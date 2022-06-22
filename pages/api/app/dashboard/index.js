import { sequelize } from "../../../../sequelize/querys";
import auth from "middlewares/auth.js";

async function handler(req, res) {
  try {
    const albums = await sequelize.Album.findAll({
      where: {
        userId: 1,
      },
      attributes: ["id", "creationDate"],
      include: [
        {
          model: sequelize.Customer,
          attributes: ["id", "name"],
        },
      ],
    });

    return res.status(200).json({
      message: "Albumes obtenidos",
      albums,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: process.env.ERROR_MESSAGE,
      albums: [],
    });
  }
}

export default auth(handler);
