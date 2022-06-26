import { sequelize } from "../../../../sequelize/querys";
import auth from "middlewares/auth.js";

async function handler(req, res) {
  const { method } = req;

  /**
   * Check if the current account is premium
   * @param {string|null} subscriptionDate - Date until the user will be premium user
   * @returns {boolean} If true, means the user stills being premium
   */
  function checkSubscription(subscriptionDate) {
    if (subscriptionDate === null) return false;

    const dateParsed = new Date(subscriptionDate);
    const today = new Date();

    return today < dateParsed ? true : false;
  }

  switch (method) {
    case "GET":
      /**
       * DTO in order to know the subscription of the user
       * @type {import("./get").DtoGetSubscription}
       */
      const { user } = req.body;

      const userDb = await sequelize.User.findOne({
        where: {
          id: user.id,
        },
      });

      return res.status(200).json({
        isSubscribed: checkSubscription(userDb.subscrption),
        date: userDb.subscrption,
      });

    case "PUT":
      return res.status(200).json({
        message: "Tu cuenta ha sido actualizada a Premium",
      });

    default:
      return res.status(400).json({
        message: "Solo se aceptan métodos GET y PUT",
      });
  }
}

export default auth(handler, false);
// export default handler;
