import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./db/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@mail.com" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) return null;

        const passwordCompare = await compare(
          credentials.password,
          user.password
        );
        if (!passwordCompare) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const userEmail = token.email;
      const dbUser = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      if (!dbUser) {
        if (user) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              password: crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
            },
          });
          token.id = newUser.id;
          token.name = newUser.name || "";
          token.email = newUser.email;
          token.role = newUser.role;
        }
        return token
      }

      token.id = dbUser.id;
      token.name = dbUser.name || "";
      token.email = dbUser.email;
      token.role = dbUser.role;
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
