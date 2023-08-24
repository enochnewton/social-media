import Message from "@models/Message";
import { connectToDB } from "@utils/database";
import { pusherServer } from "@utils/pusher";
import { NextResponse } from "next/server";

// create a new message
export const POST = async req => {
  try {
    await connectToDB();

    const { chatId, senderId, text } = await req.json();

    const newMessage = new Message({ chatId, senderId, text });

    const savedMsg = await newMessage.save();

    try {
      await pusherServer.trigger(chatId, "new:message", savedMsg);
    } catch (error) {
      console.log(error);
    }

    return NextResponse.json(savedMsg, { status: 201 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
};
