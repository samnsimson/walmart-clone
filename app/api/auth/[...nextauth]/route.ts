import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt";
import { DatabaseClient } from "@/config/databaseClient";
import { selectFields } from "@/lib/utils";

const { db } = new DatabaseClient();

const handler = NextAuth({
    session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: { email: {}, password: {} },
            async authorize(credentials) {
                try {
                    if (!credentials) return null;
                    const { email, password } = credentials;
                    const select = ["id", "email", "firstName", "lastName", "password"];
                    const user = await db.user.findFirstOrThrow({ where: { email }, select: selectFields(select) });
                    const passwordMatch = compareSync(password, String(user.password));
                    return passwordMatch ? ({ id: user.id, name: [user.firstName, user.lastName].filter(Boolean).join(" "), email: user.email } as any) : null;
                } catch (error) {
                    console.log("🚀 ~ authorize ~ error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            console.log("🚀 ~ token:", token);
            return { ...token, ...user };
        },
        session: ({ session, token }) => {
            if (!session["user"]) return session;
            session.user.name = [token.firstName, token.lastName].filter(Boolean).join(" ");
            return session;
        },
    },
    pages: {
        signIn: "/signin",
    },
});

export { handler as GET, handler as POST };
