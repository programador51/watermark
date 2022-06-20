// import { sequelize } from "../../../../sequelize/querys";
// import { setCookies } from "cookies-next";
import { sequelize } from "../../../../sequelize/querys";
import auth from "middlewares/auth.js";

async function handler(req, res) {
  console.log(req.method);

  console.log("controller sell");

  return res.status(200).json({
    name: "dasdasd",
  });
}

export default auth(handler);
// export default auth(handler);
