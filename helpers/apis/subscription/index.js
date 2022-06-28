import axios from "axios";
import qs from "qs";

/**
 * Get the status subscription of the logged account
 * @returns {import("pages/api/app/subscription/get").ResGetSubscriptionI}
 */
export async function getStatusSubscription() {
  try {
    const { data } = await axios.get("/api/app/subscription", {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    return {
      date: null,
      isSubscribed: false,
    };
  }
}

/**
 * Send the request in order to buy a subscription for the logged user
 * @returns {import("./types").DtoPaypalOc}
 */
export async function purchaseSubscription() {
  try {
    const { data } = await axios.put("/api/app/subscription", null, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    return {
      message: "No se pudo comprar la subscripcion, intenta más tarde",
    };
  }
}

/**
 * Get the token information in order to create transactions into paypal
 * @returns {import("./types").TokenPayPalI}
 */
export async function getAccessTokenPaypal() {
  const dataBody = qs.stringify({
    grant_type: "client_credentials",
  });

  try {
    const { data } = await axios.post(process.env.PAYPAL_TOKEN_URL, dataBody, {
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      },
      headers: {
        ["Content-Type"]: "application/x-www-form-urlencoded",
      },
    });

    return data;
  } catch (error) {
    console.log(error);

    throw new Error(
      "No se pudo obtener la conexion a paypal, intenta más tarde",
      {
        cause: error,
      }
    );
  }
}

/**
 * Attempt confirm the payment done by the user on paypal in order to receive the money and update the account tier to premium
 * @param {string} token - Token of the transaction
 * @param {string} PayerID - Id of the transaction for paypal
 * @returns {import("./types").CreateOrderResI} Information of the confirmation
 */
export async function attemptConfirmPayment(token, PayerID) {
  try {
    const { data } = await axios.post(
      "/api/app/subscription",
      {
        token,
        PayerID,
      },
      {
        withCredentials: true,
      }
    );

    return {
      status: 200,
      data,
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
    };
  }
}
