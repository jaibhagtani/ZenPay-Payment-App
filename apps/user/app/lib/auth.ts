import { prisma } from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt" 
export const NEXT_AUTH = {
    
    providers: [
    CredentialsProvider({
        name: 'Credentials',
       
        credentials: {
          phone: { label: "Phone Number", type: "text", placeholder: "1231231231", required: true},
          password: { label: "Password", type: "password", required: true}
        },

        // The whole logic will be here 
        async authorize(credentials: any) {

          // Do Zod validations, OTP validation here
          // console.log(credentials);
          // *************************
          // We don't do like hash this password and compare with the password comming form DB,
          // because, This will always give you a new Hash
          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          const existingUser = await prisma.user.findFirst({
            where: {
              number: credentials.phone
            }
          });

          if(existingUser)
          { 
            const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
            if(passwordValidation)
            {
              // now nextauth will take care of making and maintaining cookies 
              return {
                id: existingUser.id.toString(),
                name: existingUser.name,
                email: existingUser.email
              }
            }
            // if password is not valid 
            return null;
          }

          try {
            const user = await prisma.user.create({
              data: {
                number: credentials.phone,
                password: hashedPassword
              }
            });
            // you should send the otp to the user's Phone number here
            await prisma.balance.create({
              data: {
                userId: user.id,
                amount: 0,
                locked: 0
              }
            })
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
            }
          }
          catch(e)
          {
            console.error(e);
          }

          return null;
        },
      })
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  callbacks: {
    // fix the type here
    async session({ token, session }: any) {
      
      // console.log(token.sub);
      session.user.id = token.sub
      
      // console.log(session);
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
  }
}