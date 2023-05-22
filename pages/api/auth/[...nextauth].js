import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import Auth0Provider from 'next-auth/providers/auth0';
import LinkedInProvider from 'next-auth/providers/linkedin';

import axios from 'axios';

const url = process.env.URL;
// handle outside providers
const addProviderUserToDb = async (
  username,
  email,
  image,
  provider,
  provider_id
) => {
  try {
    await axios
      .post(`${url}/api/user`, {
        username,
        email,
        image,
        provider,
        provider_id,
      })
      .then((res) => {});
  } catch (err) {
    console.log(err.data);
  }
};
// handle credentials users
const loginWithCredentials = async (email, password) => {
  try {
    const res = await axios.get(
      `${url}/api/user/credentials?email=${email}&password=${password}`
    );
    return res.data.user;
  } catch (err) {
    console.log(err.data);
  }
};
// chack if user exist in db
const checkIfUserExist = async (id) => {
  try {
    const res = await axios.get(`${url}/api/user/exist?id=${id}`);
    return res.data;
  } catch (err) {
    console.log(err.data);
  }
};

export const authOptions = {
  // PROVIDERS
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Your@Email.com' },
        username: {
          label: 'Username',
          type: 'username',
          placeholder: 'username',
        },
        provider: {
          label: 'provider',
          type: 'provider',
          placeholder: 'provider',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '********',
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const user = await loginWithCredentials(email, password);
        // console.log(user);
        const userWithoutpassword = {
          id: user._id,
          email: user.email,
          provider: 'local',
          username: user.username,
        };
        return userWithoutpassword;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // callbacks
  callbacks: {
    // Handle session
    async session(session) {
      if (!session.session.user.image) {
        // Fetch the complete user object from your database
        const sessionUserToken = session.token;
        const user = await checkIfUserExist(sessionUserToken.sub);
        if (user) {
          session.session.user = user;
          return session.session;
        }
      }

      return session.session;
    },

    // sign in
    async signIn(user) {
      const provider = user.account.provider;
      if (provider !== 'credentials') {
        const { name, email, image, id } = user.user;
        await addProviderUserToDb(name, email, image, provider, id);
        return true;
      }
      return true;
    },
    // async jwt({ token }) {
    //   token.userRole = 'admin';
    //   return token;
    // },
  },
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};
export default NextAuth(authOptions);
