import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import dbConnection from "../lib/dbconection";
import Users from "@/app/models/users";
import { IUser } from "@/app/interfaces/users";


await dbConnection();

async function getUser(email: string): Promise<IUser | null> {
  try {
    const user = await Users.findOne({ email }).exec();
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        
        if (!isValid) return null;

        return {
          id: user._id,
          email: user.email,
          password: user.password,
        };
      },
    }),
  ],
});
