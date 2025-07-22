// import NextAuth from 'next-auth';
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import { prisma } from '@/db/prisma';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { compareSync } from 'bcrypt-ts-edge';

// export const config = {
//     pages: {
//         signIn: '/sign-in',
//         error: '/sign-in'
//     },
//     sesiion: {
//         stratergy: 'jwt',
//         maxAge: 30 * 24 * 60 * 60, // 30 days
//     },
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         CredentialsProvider({
//             credentials: {
//                 email: { type: 'email' },
//                 password: { type: 'password' }
//             },

//             async authorize(credentials) {
//                 if (credentials == null) return null;

//                 //Find user in database
//                 const user = await prisma.user.findFirst({
//                     where: {
//                         email: credentials.email as string,
//                     }
//                 });

//                 //Checl is user exists of if password is correct
//                 if (user && user.password) {
//                     const isMatch = compareSync(credentials.password as string, user.password);

//                     // If user exists and password matches, return user
//                     if (isMatch) {
//                         return {
//                             id: user.id,
//                             name: user.name,
//                             email: user.email,
//                             role: user.role
//                         }
//                     }
//                 }
//                 // If user not found or password doesn't match, return null
//                 return null;
//             },
//         }),
//     ],
//     callbacks: {
//         async session({ session, user, trigger, token }: any) {
//             //set the user id from the token
//             session.user.id = token.sub;

//             // If there is an update, set the user name
//             if (trigger === 'update'){
//                 session.user.name = user.name;
//             }
//             return session;
//         },
//     },
// };

// export const { handlers, auth, signIn, signOut } = NextAuth(config);