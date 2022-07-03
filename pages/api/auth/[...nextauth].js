import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import jwt from "jsonwebtoken";
import { setCookies } from "cookies-next";
import { sequelize } from "../../../sequelize/querys";

/**
 * Middleware to handle the authorization of the app
 * @param {import("next").NextApiRequest} req  - Request
 * @param {import("next").NextApiResponse} res - Response
 * @returns {import("next-auth").NextAuthOptions} Options
 */
const nextAuthOptions = (req, res) => ({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        let userDb = await sequelize.User.findOne({
          where: {
            email: user.email,
            logInMethod: "facebook",
          },
        });

        if (userDb === null) {
          userDb = await sequelize.User.create({
            defaultWatermark: `www.onlynudes.com/${user.id}`,
            logInMethod: "facebook",
            profilePicture: user.image,
            registrationDate: "2022-01-01",
            subscription: null,
            email: user.email,
          });
        }

        const accessToken = jwt.sign(
          JSON.parse(JSON.stringify(userDb)),
          process.env.SECRET_SIGN_JWT,
          {
            expiresIn: process.env.ACCESS_TOKEN_DURATION,
          }
        );
        const refreshToken = jwt.sign(
          JSON.parse(JSON.stringify(userDb)),
          process.env.SECRET_SIGN_JWT
        );

        setCookies(process.env.ACCESS_TOKEN_NAME, accessToken, {
          req,
          res,
          httpOnly: true,
        });

        setCookies(process.env.REFRESH_TOKEN_NAME, refreshToken, {
          req,
          res,
          httpOnly: true,
        });

        await sequelize.RefreshToken.create({
          refreshToken: refreshToken,
          userId: userDb.id,
        });

        return true;
      } catch (error) {
        // (async function () {
        //   let testAccount = await nodemailer.createTestAccount();

        //   // create reusable transporter object using the default SMTP transport
        //   let transporter = nodemailer.createTransport({
        //     host: process.env.EMAIL_SERVER_HOST,
        //     port: process.env.EMAIL_SERVER_PORT,
        //     secure: true, // true for 465, false for other ports
        //     auth: {
        //       user: process.env.EMAIL_FROM, // generated ethereal user
        //       pass: process.env.EMAIL_SERVER_PASSWORD, // generated ethereal password
        //     },
        //   });

        //   // send mail with defined transport object
        //   await transporter.sendMail({
        //     from: `"Fred Foo 👻" <${process.env.EMAIL_FROM}>`, // sender address
        //     to: "jperez@saiko.mx", // list of receivers
        //     subject: "Hello ✔", // Subject line
        //     text: "Hello world?", // plain text body
        //     html: `<p>${error}</p>`, // html body
        //   });
        //   return false;
        // })();
        // console.log(error);
        return false;
      }
    },
  },
});

/**
 * @type {import("./types").NextAuthMiddleware}
 */
const NextAuthMiddleware = (req, res) =>
  NextAuth(req, res, nextAuthOptions(req, res));
export default NextAuthMiddleware;
