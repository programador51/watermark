import { sequelize } from "../../../../sequelize/querys";
import auth from "middlewares/auth.js";
import axios from "axios";
import { getAccessTokenPaypal } from "helpers/apis/subscription";

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
      try {
        const { access_token } = await getAccessTokenPaypal();

        const dto = {
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "MXN",
                value: "99.99",
              },
            },
          ],
          application_context: {
            brand_name: "Safe Nudes MX",
            landing_page: "NO_PREFERENCE",
            return_url: "http://localhost:3000",
            cancel_url: `${process.env.URL_APP}/app/subscripcion`,
          },
        };
        /**
         * @type {{data:import("helpers/apis/subscription/types").DtoPaypalOc}}
         */
        const { data } = await axios.post(
          `${process.env.PAYPAL_API}/v2/checkout/orders`,
          dto,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        return res.status(200).json({
          ...data,
        });
      } catch (error) {
        console.log(error);

        return res.status(500).json({
          message: "No se pudo realizar la compra de la subscripcion premium",
          error,
        });
      }

    // return res.status(200).json({
    //   message: "Tu cuenta ha sido actualizada a Premium",
    // });

    default:
      return res.status(400).json({
        message: "Solo se aceptan métodos GET y PUT",
      });
  }
}

export default auth(handler, false);
// export default handler;
