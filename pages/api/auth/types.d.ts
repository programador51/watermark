import { NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions } from "next-auth";

// export type NextAuthMiddleware = (req: NextApiRequest, res: NextApiResponse) => (req: NextApiRequest, res: NextApiResponse);
export type NextAuthMiddleware = (req: NextApiRequest, res: NextApiResponse) => {
    req: NextApiRequest, res: NextApiResponse
}