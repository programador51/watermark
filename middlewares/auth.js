// import { NextResponse } from "next/server";
import { getCookie, setCookies } from "cookies-next";
import jwt from "jsonwebtoken";
import { sequelize } from "../sequelize/querys";

const middleware = (controller) => {
  return async (req, res) => {
    const accessToken = getCookie("onlynudesaccesstoken", {
      req,
      res,
    });

    const refreshToken = getCookie("onlynudesrefreshtoken", {
      req,
      res,
    });

    if (!accessToken || !refreshToken) {
      return res.status(403).json({
        message: "Inicia sesión para acceder a la información",
      });
    }

    try {
      // Valid access token
      jwt.verify(accessToken, process.env.SECRET_SIGN_JWT);
      return controller(req, res);
    } catch (error) {
      // Expired access token
      try {
        const signedRefreshToken = jwt.verify(
          refreshToken,
          process.env.SECRET_SIGN_JWT
        );

        // console.log("rererererere", signedRefreshToken);

        const refreshTokenDb = await sequelize.RefreshToken.findOne({
          where: {
            refreshToken,
          },
        });

        if (refreshTokenDb !== null) {
          const userDb = await sequelize.User.findOne({
            where: {
              id: signedRefreshToken.id,
            },
          });

          const newAccessToken = jwt.sign(
            JSON.parse(JSON.stringify(userDb)),
            process.env.SECRET_SIGN_JWT,
            {
              expiresIn: "5m",
            }
          );

          setCookies("onlynudesaccesstoken", newAccessToken, {
            req,
            res,
            httpOnly: true,
          });

          return controller(req, res);
        }

        return res.status(403).json({
          message: "Inicia sesión para acceder a la información",
        });
      } catch (error) {
        // Invalid refresh token
        console.log(error);

        res.status(500).json({
          message:
            "El servidor esta caído. Mantente informado en cuando esto se arregle :(",
        });
      }
    }
  };
};
export default middleware;
