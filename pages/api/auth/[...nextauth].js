import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signin } from "@controller/authController";

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
            name: res.user.fullName,
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
      if (session.user.image) {
      } else {
        session.user.image = null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
