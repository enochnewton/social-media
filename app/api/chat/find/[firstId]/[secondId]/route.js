import Chat from "@models/Chat";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

// get all messages of a chat between two users
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const { firstId, secondId } = params;

    const foundChat = await Chat.findOne({
      usersIds: { $all: [firstId, secondId] },
    });

    if (!foundChat)
      return NextResponse.json({ message: "Chat not found" }, { status: 404 });

    return NextResponse.json(foundChat, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
};
