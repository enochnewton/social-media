import Chat from "@models/Chat";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

// create a new chat
export const POST = async req => {
  try {
    await connectToDB();

    const { senderId, receiverId } = await req.json();

    // create a new chat
    const newChat = new Chat({
      usersIds: [senderId, receiverId],
    });

    // save the new chat
    const savedChat = await newChat.save();

    return NextResponse.json(savedChat, { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
