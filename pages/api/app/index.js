import auth from "middlewares/auth.js";

async function handler(req, res) {
  return res.status(200).json({
    message: "Autenticado correcto",
    isAuthenticated: true,
  });
}

export default auth(handler);
