import { sequelize } from "../../../../sequelize/querys";
import auth from "middlewares/auth.js";
import axios from "axios";
import { setCookies, removeCookies } from "cookies-next";
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
              description: "31 días de premium en Safe Nudes",
            },
          ],

          application_context: {
            brand_name: "Safe Nudes MX",
            landing_page: "NO_PREFERENCE",
            return_url: `${process.env.URL_APP}/app/procesando-pago`,
            cancel_url: `${process.env.URL_APP}/app/subscripcion`,
          },
        };
        /**
         * @type {{data:import("helpers/apis/subscription/types").DtoPaypalOc}}
         */
        const { data } = await axios.post(
          `${process.env.PAYPAL_API_V2}/checkout/orders`,
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

    case "POST":
      /**
       * @type {import("./get").CreateOrderDto}
       */
      const { token, PayerID, user: jwtUser } = req.body;

      try {
        const { access_token } = await getAccessTokenPaypal();

        const { data } = await axios.post(
          `${process.env.PAYPAL_API_V2}/checkout/orders/${token}/capture`,
          {},
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        const durationPremium = new Date();
        durationPremium.setDate(durationPremium.getDate() + 31);

        await sequelize.User.update(
          {
            subscrption: `${durationPremium.getFullYear()}-${
              durationPremium.getMonth() + 1
            }-${durationPremium.getDate()}`,
          },
          {
            where: {
              id: jwtUser.id,
            },
          }
        );

        const userDb = sequelize.User.findOne({
          where: {
            id: jwtUser.id,
          },
        });

        const accessToken = jwt.sign(
          JSON.parse(JSON.stringify(userDb)),
          process.env.SECRET_SIGN_JWT,
          {
            expiresIn: process.env.ACCESS_TOKEN_DURATION,
          }
        );

        removeCookies(process.env.ACCESS_TOKEN_NAME, {
          httpOnly: true,
          req,
          res,
          path: "/",
          domain: process.env.URL_APP,
        });

        setCookies(process.env.ACCESS_TOKEN_NAME, accessToken, {
          req,
          res,
          httpOnly: true,
        });

        return res.status(200).json({
          message:
            "Cuenta actualizada a premium 🥳. Disfruta de los beneficios durante",
          transaction: data,
        });
      } catch (error) {
        console.log(error);

        return res.status(200).json({
          message:
            "No se pudo realizar el pago. ¿Deseas re-intentar la transacion?",
          error,
        });
      }

    default:
      return res.status(400).json({
        message: "Solo se aceptan métodos GET/PUT/POST",
      });
  }
}

export default auth(handler, false);
// export default handler;
