import { AuthOptions, NextAuthOptions } from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "@/lib/db";

import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
// more providers at https://next-auth.js.org/providers
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "anwar@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log(
            "Authorize function called with credentials:",
            credentials
          );
          // Check if user credentials are Correct
          if (!credentials?.email || !credentials?.password) {
            throw { error: "No Inputs Found", status: 401 };
          }
          console.log("Pass 1 checked ");
          //Check if user exists
          const existingUser = await prismaClient.user.findUnique({
            where: { email: credentials.email },
          });

          if (!existingUser) {
            console.log("No user found");
            throw { error: "No user found", status: 404 };
          }

          console.log("Pass 2 Checked");
          console.log(existingUser);
          let passwordMatch: boolean = false;
          //Check if Password is correct
          if (existingUser && existingUser.password) {
            // if user exists and password exists
            passwordMatch = await compare(
              credentials.password,
              existingUser.password
            );
          }
          if (!passwordMatch) {
            console.log("Password incorrect");
            throw { error: "Password Incorrect", status: 401 };
          }
          console.log("Pass 3 Checked");
          const user = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
            picture: existingUser.image,
          };
          //
          console.log("User Compiled");
          console.log(user);
          return user;
        } catch (error) {
          console.log("aLL Failed");
          console.log(error);
          throw { error: "Something went wrong", status: 401 };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await prismaClient.user.findUnique({
        where: { email: token?.email ?? "" },
      });
      if (!dbUser) {
        token.id = user!.id;
        return token;
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        picture: dbUser.image,
      };
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
