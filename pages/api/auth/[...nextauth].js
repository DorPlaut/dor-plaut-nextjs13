import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

const addNewUserToDb = async (username, email, image, google_id) => {
  const url = process.env.URL;
  try {
    await axios
      .post(`${url}/api/user`, { username, email, image, google_id })
      .then((res) => {});
  } catch (err) {
    console.log(err);
  }
};

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(user) {
      const { name, email, image, id } = user.user;
      addNewUserToDb(name, email, image, id);
      return true;
    },
    async jwt({ token }) {
      token.userRole = 'admin';
      return token;
    },
  },
  // pages: {
  //   signIn: '/auth/signin',
  //   // signOut: '/auth/signout',
  //   // error: '/auth/error', // Error code passed in query string as ?error=
  //   // verifyRequest: '/auth/verify-request', // (used for check email message)
  //   // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
};
export default NextAuth(authOptions);
