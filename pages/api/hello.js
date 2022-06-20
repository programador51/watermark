// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  return res.status(200).json({
    name: "Testing...",
  });
}
