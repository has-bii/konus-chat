import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signin } from "@controller/authController";
import connectDB from "@utils/connectDB";
import User from "@model/user";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const res = await signin(email, password);

        if (res.authenticated) {
          const user = {
            _id: res.user._id,
            name: res.user.name,
            email: res.user.email,
          };

          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectDB();

      const findUser = await User.findOne({ email: session.user.email }).select(
        "_id name username email image"
      );

      if (!findUser) {
        var username = session.user.name.toLowerCase().replace(" ", "");

        const user = new User({
          name: session.user.name,
          email: session.user.email,
          username: username,
          image: session.user.image,
          password: bcrypt.hashSync(
            (Math.floor(Math.random() * 10000) + 1).toString(),
            12
          ),
        });

        await user.save();

        session.user.id = user._id.toString();
        session.user.username = user.username;

        return session;
      }

      session.user.id = findUser._id.toString();
      session.user.username = findUser.username;
      session.user.image = findUser.image;

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
