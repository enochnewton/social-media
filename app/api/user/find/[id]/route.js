import User from "@models/User";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const foundUser = await User.findById(params.id);

    if (!foundUser) return new Response("User not found", { status: 404 });

    return new Response(JSON.stringify(foundUser), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
