// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  console.log(session);

  if (!session)
    return res.status(403).json({
      message: "Acceso no autorizado. Inicia sesion",
    });

  return res.status(200).json({
    name: "Testing...",
  });
}
