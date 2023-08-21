import Message from "@models/Message";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

// get all messages from a chat
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const { chatId } = params;

    const foundMessage = await Message.find({ chatId });

    if (!foundMessage)
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );

    return NextResponse.json(foundMessage, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
};
