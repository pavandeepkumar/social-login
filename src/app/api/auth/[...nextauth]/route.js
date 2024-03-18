
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedinProvider from "next-auth/providers/linkedin";
import GithubProvider from "next-auth/providers/github";
export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/log-in',
  },

  providers: [
    // Credentials login

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "8980676025-b64q2ln9hggqsda9ib03qd5tblutd718.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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"
    })
    ,
    FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID || "2675271489290578",
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "ff113ee8fd0c7567b4e3314aa2a34bf3"
    }),
    LinkedinProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || "24GdXlNIo1ZyegJ0",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "24GdXlNIo1ZyegJ0"
    }),
    GithubProvider(
      {
        clientId: process.env.GITHUB_CLIENT_ID || "Iv1.93f3bdbe404a8c10",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "200fcf6735281212d07f09eccca67fdd2bee53a4"
      }
    )


    // CredentialsProvider({
    //   credentials: {
    //     email: {},
    //     password: {},
    //   },

    //   async authorize(credentials) {
    //     //
    //     const credentialDetails = {
    //       email: credentials.email,
    //       password: credentials.password,
    //     };

    //     const resp = await LoginCall(credentialDetails);
    //     // console.log(resp);
    //     if (resp) {
    //       const user = {
    //         id: resp._id,
    //         name: resp.firstName + ' ' + resp.lastName,
    //         role: resp.role,
    //         email: resp.email,
    //         accessToken: resp.token,
    //         image: resp.image,
    //       };
    //       return user;
    //     }
    //     return null;

    //     // // const resp = await fetch(
    //     // //   "https://kiwimi-api.devstree.com/api/v1" + API.auth.login,
    //     // //   {
    //     // //     method: "POST",
    //     // //     headers: {
    //     // //       "Content-Type": "application/json",
    //     // //     },
    //     // //     body: credentialDetails,
    //     // //   }
    //     // // );
    //     // console.log(resp, "patt se");
    //     // if (resp) {
    //     //   return resp;
    //     // } else {
    //     //   console.log(credentialDetails, "patt se");
    //     //   return null;
    //     // }
    //   },
    // }),

    // OAuth authentication providers...

    // GoogleProvider({
    //   clientId: '209143802905-0tt1rf998ai7sbal2s5dk1bmjj51m5ft.apps.googleusercontent.com',
    //   clientSecret: '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',
    // }),
    // FacebookProvider({
    //   clientId: '667062642274760',
    //   clientSecret: '129a94686590ac19fbf6bf7e962c1dac',
    // }),
    // LinkedInProvider({
    //   clientId: '209143802905-0tt1rf998ai7sbal2s5dk1bmjj51m5ft.apps.googleusercontent.com',
    //   clientSecret: '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',
    // }),
    // Passwordless / email sign in
  ],
  // callbacks: {
  //   session: async ({ session, token }) => {
  //     console.log("in Session callback", session, token);
  //     session.id = token.id;
  //     session.jwt = token.token;
  //     return Promise.resolve(session);
  //   },
  //   jwt: async ({ token, user }) => {
  //     console.log("In JWT callback", token, user);
  //     const isSignIn = user ? true : false;
  //     if (isSignIn) {
  //       token.id = user._id;
  //       token.jwt = user.token;
  //     }
  //     return Promise.resolve(token);
  //   },
  // },
  // logger: {
  //   error(code, metadata) {
  //     console.error(code, metadata);
  //   },
  //   warn(code) {
  //     console.warn(code);
  //   },
  //   debug(code, metadata) {
  //     console.debug(code, metadata);
  //   },
  // },
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
  callbacks: {
    async jwt({ token, user, trigger, session, account, profile }) {
      // console.log(token, user, "in jwt");
      // Persist the OAuth access_token and or the user id to the token right after signin
      // console.log(token);
      // console.log("//////////////////////////Token////////");
      // console.log(user);
      // console.log("//////////////////////////user////////");
      // console.log(account);
      // console.log("//////////////////////////account////////");
      // console.log("//////////////////////////jwt////////");
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.id = user.id;
      }
      if (trigger === 'update' && session?.image) {
        token.image = session.image;
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log("user: " + user)
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log("url",url)
      console.log("baseUrl",baseUrl)
      return baseUrl
    },

    async session({ session, token }) {
      // console.log(session, token, user, "in session");
      // Send properties to the client, like an access_token and user id from a provider.
      // console.log(session);
      // console.log("//////////////////////////session////////");
      // console.log(token);
      // console.log("//////////////////////////token////////");
      // console.log("//////////////////////////session////////");

      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.role = token.role;
        session.user.id = token.id;
        if (token.image) {
          session.user.image = token.image;
        }
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret!JWTrandom65",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
