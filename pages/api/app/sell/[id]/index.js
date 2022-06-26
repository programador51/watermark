import { sequelize } from "../../../../../sequelize/querys";
import auth from "middlewares/auth.js";

async function handler(req, res) {
  /**
   * DTO in order to get the information of the album
   * @type {import("./types").DtoGetAlbum}
   */
  const { id } = req.query;

  /**
   * Information of the jwt
   * @type {import("middlewares/types").JwtI}
   */
  const { user } = req.body;

  try {
    const canCheckAlbum = await sequelize.Album.findOne({
      where: {
        userId: user.id,
        id,
      },
    });

    if (canCheckAlbum === null) {
      return res.status(403).json({
        message: "No puedes mirar la informacion de este album",
      });
    }

    const [albumInfo, note] = await Promise.all([
      sequelize.Media.findAll({
        where: {
          albumsId: id,
        },
        attributes: ["uuid"],
        raw: true,
      }),
      sequelize.AlbumsEvidence.findOne({
        where: {
          albumsId: id,
        },
        attributes: ["notes"],
        raw: true,
      }),
    ]);

    console.log(note);

    res.status(200).json({
      uuids: albumInfo.map((photo) => photo.uuid),
      note: note !== null ? note.notes : "",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Intenta más tarde",
    });
  }
}

export default auth(handler);
// export default handler;
