import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt";
import { DatabaseClient } from "@/config/databaseClient";
import { selectFields } from "@/lib/utils";
import { omit } from "lodash";
const { db } = new DatabaseClient();

const handler = NextAuth({
    session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
            async authorize({ email, password }) {
                try {
                    const user = await db.user.findFirst({ where: { email }, select: selectFields(["id", "email", "firstName", "lastName", "password"]) });
                    return user ? (compareSync(password, user["password"]) ? omit(user, "password") : null) : null;
                } catch (error) {
                    console.log("🚀 ~ authorize ~ error:", error);
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            return { ...token, ...user };
        },
        session: async ({ session, token }) => {
            session.user.id = token.id;
            session.user.name = [token.firstName, token.lastName].filter(Boolean).join(" ");
            console.log("🚀 ~ session: ~ session:", session);
            return session;
        },
    },
    pages: {
        signIn: "/signin",
    },
});

export { handler as GET, handler as POST };
