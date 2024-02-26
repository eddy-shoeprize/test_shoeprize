import NextAuth, { type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import GitHub from "next-auth/providers/github";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GitHub,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (true) {
          // 백엔드에서 로그인 처리
          // const { username, password } = credentials;
          // const loginRes = await fetch('https://', {
          //   username,
          //   password
          // });

          let loginRes = {
            success: true,
            data: {
              user: {
                ID: "user1",
                NAME: "에디",
                EMAIL: "email@email.email",
              },
            },
          };

          if (!loginRes.success) return null;
          const user = {
            id: loginRes.data.user.ID ?? "",
            name: loginRes.data.user.NAME ?? "",
            email: loginRes.data.user.EMAIL ?? "",
          };

          return user;
        }
        return null;
      },
    }),

    // CredentialsProvider({
    //   async authorize(credentials) {
    //     console.log("eddy 11111");
    //     if (true) {
    //       // 백엔드에서 로그인 처리
    //       // const { username, password } = credentials;
    //       // const loginRes = await fetch('https://', {
    //       //   username,
    //       //   password
    //       // });

    //       let loginRes = {
    //         success: true,
    //         data: {
    //           user: {
    //             ID: "user1",
    //             NAME: "에디",
    //             EMAIL: "email@email.email",
    //           },
    //         },
    //       };

    //       if (!loginRes.success) return null;
    //       const user = {
    //         id: loginRes.data.user.ID ?? "",
    //         name: loginRes.data.user.NAME ?? "",
    //         email: loginRes.data.user.EMAIL ?? "",
    //       };
    //       return user;
    //     }
    //     return null;
    //   },
    // }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // if (profile) {
      //   token.id = profile.id;
      //   token.image = profile.avatar_url || profile.picture;
      // }
      // console.log("eddy profile", profile);
      return token;
    },
    session: ({ session, token }) => {
      if (session?.user && token?.id) {
        session.user.id = String(token.id);
      }
      return session;
    },
    authorized({ auth }) {
      return !!auth?.user; // this ensures there is a logged in user for -every- request
    },
  },
  pages: {
    signIn: "/sign-in", // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  },
});
