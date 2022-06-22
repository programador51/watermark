// import { sequelize } from "../../../../sequelize/querys";
// import { setCookies } from "cookies-next";
import { sequelize } from "../../../../sequelize/querys";
import auth from "middlewares/auth.js";
import { getCookie } from "cookies-next";

async function handler(req, res) {
  const accessToken = getCookie(process.env.ACCESS_TOKEN_NAME, {
    httpOnly: true,
    req,
    req,
    sameSite: true,
  });
  console.log(accessToken);

  return res.status(200).json({
    name: "dasdasd",
  });
}

export default auth(handler);
