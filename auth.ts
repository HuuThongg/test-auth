import NextAuth from 'next-auth';
import { db } from '@/db';
import authConfig from '@/auth.config';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true;
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // if (token.role && session.user) {
      //   session.user.role = token.role as "ADMIN" | "USER";
      // }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        // session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      // const existingUser = await getUserById(token.sub);

      // if (!existingUser) return token;

      // const existingAccount = await getAccountByUserId(existingUser.id);

      // token.isOAuth = !!existingAccount;
      // token.name = existingUser.name;
      // token.email = existingUser.email;
      // token.role = existingUser.role as "ADMIN" | "USER";
      // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
