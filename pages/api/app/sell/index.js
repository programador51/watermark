import { sequelize } from "../../../../sequelize/querys";
import auth from "middlewares/auth.js";
// import config from "./config";

export const config = { api: { bodyParser: { sizeLimit: "25mb" } } };

async function handler(req, res) {
  /**
   * DTO in order to create an album
   * @type {import("./types").DtoSell}
   */
  const { id, idsPhotos, notes, user } = req.body;

  try {
    if (req.method !== "POST") {
      return res.status(400).json({
        message: "Solo se aceptan peticiones POST",
        wasCreated: false,
      });
    }

    await sequelize.Album.create({
      id,
      userId: user.id,
      creationDate: new Date(),
      customerId: null,
    });

    const querysEvidenciaMedia = idsPhotos.map((uuid) =>
      (async function () {
        await sequelize.Media.create({
          id: null,
          albumsId: id,
          uuid,
        });
      })()
    );

    await Promise.all([
      ...querysEvidenciaMedia,
      (async function () {
        sequelize.AlbumsEvidence.create({
          id: null,
          notes,
          albumsId: id,
        });
      })(),
    ]);

    return res.status(200).json({
      message: "Venta creada",
      wasCreated: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: process.env.ERROR_MESSAGE,
      wasCreated: false,
    });
  }
}

export default auth(handler, false);
// export default handler;
