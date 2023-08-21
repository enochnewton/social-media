import User from "@models/User";
import { connectToDB } from "@utils/database";
import GoogleProvider from "next-auth/providers/google";
export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile: user }) {
      try {
        await connectToDB();

        //check if user exists
        const userExists = await User.findOne({ email: user.email });

        //if user doesnot exist, create one
        if (userExists === null) {
          await User.create({
            fullName: user.name
              .split(" ")
              .map(
                name =>
                  name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
              )
              .join(" "),
            email: user.email,
            picturePath: user.picture,
            sessionId: user.id,
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
