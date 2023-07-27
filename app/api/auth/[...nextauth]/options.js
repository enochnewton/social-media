import User from "@models/User";
import { connectToDB } from "@utils/database";
import GoogleProvider from "next-auth/providers/google";
export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      console.log({ sessionUser });

      session.user.id = sessionUser._id;
      return session;
    },
    async signIn({ user }) {
      try {
        await connectToDB();

        //check if user exists
        const userExists = await User.findOne({ email: user.email });

        //if user doesnot exist, create one
        if (userExists === null) {
          await User.create({
            firstName: user.name,
            lastName: user.name,
            email: user.email,
            picturePath: user.image,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
