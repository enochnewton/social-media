import Chat from "@models/Chat";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

// get all chats of a user to display them in the sidebar
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const { userId } = params;

    // find all chats that have the user's id in their usersIds array
    const foundChats = await Chat.find({ usersIds: { $in: [userId] } });

    if (!foundChats)
      return NextResponse.json({ message: "Chats not found" }, { status: 404 });

    return NextResponse.json(foundChats, { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
