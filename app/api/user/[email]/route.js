import User from "@models/User";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const foundUser = await User.findOne({ email: params.email });
    if (!foundUser) return new Response("User not found", { status: 404 });

    return new Response(JSON.stringify(foundUser), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
