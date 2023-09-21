import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          placeholder: "youremail@email.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "yourpassword",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            OR: [{ email: credentials.email }, { username: credentials.email }],
          },
        });

        const matchPassword = await bcrypt.compare(
          credentials.password,
          user?.password as string
        );

        if (!user && !matchPassword) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email!,
          username: token.username,
        },
      });

      if (!dbUser) {
        token.id = user.id;
        return token;
      }
      return {
        id: dbUser?.id,
        name: dbUser?.name,
        username: dbUser?.username,
        email: dbUser?.email,
        picture: dbUser?.profileImage, // profileImage
      };
    },
  },
};

export const getAuthSession = async () => await getServerSession(authOptions);
