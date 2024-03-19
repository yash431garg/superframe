import { NextAuthOptions, User, getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { supabase } from '../lib/supabase';

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth', // Path to your custom sign-in page
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',

      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const { data: dbUser, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .single();
        //Verify Password here
        //We are going to use a simple === operator
        //In production DB, passwords should be encrypted using something like bcrypt...
        if (dbUser && dbUser.password === credentials.password) {
          const { password, createdAt, id, ...dbUserWithoutPassword } = dbUser;
          return dbUserWithoutPassword as User;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPA_URL as string,
    secret: process.env.SUPA_SERVICE_ROLE as string,
  }),
  callbacks: {
    // async jwt({ token, user }) {
    //   console.log(token, '1', user);
    //   // Persist the OAuth access_token and or the user id to the token right after signin
    //   if (user) {
    //     token.accessToken = user?.access_token;
    //     token.id = user.id;
    //   }
    //   return token;
    // },
    // async session({ session, token }) {
    //   console.log(session);
    //   // Send properties to the client, like an access_token and user id from a provider.
    //   session.accessToken = token.accessToken;
    //   session.user.id = token.id;
    //   return session;
    // },
  },
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect('/');
}

export function loginIsRequiredClient() {
  if (typeof window !== 'undefined') {
    const session = useSession();
    const router = useRouter();
    if (!session) router.push('/');
  }
}
