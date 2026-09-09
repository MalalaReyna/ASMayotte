import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

async function refreshAccessToken(token: any) {
  console.log("REFRESHING TOKEN");
  try {
    const res = await fetch(`${API_URL}/Authentication/RefreshToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
      cache: "no-store",
    });
    /* console.log("REFRESH TOKEN RESPONSE", res); */
    if (!res.ok) throw new Error("Refresh failed");
    const resultat = await res.json();
    const data = resultat.data ?? resultat;
    return {
      ...token,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken ?? token.refreshToken,
      accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1h,
      error: undefined,
    };
  } catch (error) {
    console.error("REFRESH ERROR", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/Authentication/Login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed.data),
            cache: "no-store",
          },
        );

        if (!res.ok) return null;

        const data = await res.json();
        const userPayload = data.data ?? data;
        const id = userPayload?.id;
        if (!id) return null;
        return {
          id: String(id),
          name: userPayload?.name ?? "",
          email: userPayload?.email ?? "",
          role: userPayload?.role ?? "",
          accessToken: userPayload.accessToken ?? userPayload.token ?? "",
          refreshToken: userPayload.refreshToken ?? "",
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      /* console.log("JWT CALLBACK - LOGIN", { user, token }); */
      // LOGIN
      if (user) {
        return {
          id: (user as any).id,
          name: (user as any).name,
          role: (user as any).role,
          email: (user as any).email,
          accessToken: (user as any).accessToken,
          refreshToken: (user as any).refreshToken,
          error: undefined,
          accessTokenExpires: Date.now() + 60 * 60 * 1000, //1H
        };
      }
      const bufferTime = 5 * 1000; // 5s
      // TOKEN ENCORE VALIDE
      if (
        token.accessTokenExpires &&
        Date.now() < token.accessTokenExpires - bufferTime
      ) {
        return token;
      }

      // TOKEN EXPIRE → REFRESH
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: (token.id as string) ?? "",
        role: (token.role as string) ?? "",
      };
      session.accessToken = token.accessToken as string | undefined;
      session.error = token.error as string | undefined;
      /* console.log("SESSION CALLBACK", { session }); */
      return session;
    },
  },
});
