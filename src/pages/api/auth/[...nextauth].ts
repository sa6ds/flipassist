import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "~/server/db";

const discordClientId = process.env.DISCORD_CLIENT_ID;
const discordClientSecret = process.env.DISCORD_CLIENT_SECRET;

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (
  !discordClientId ||
  !discordClientSecret ||
  !googleClientId ||
  !googleClientSecret
) {
  throw new Error("Missing Google or Discord Client or Secret");
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    //     signIn: "/auth/login",
    newUser: "/content/dashboard",
    error: "/error",
  },
};

export default NextAuth(authOptions);
