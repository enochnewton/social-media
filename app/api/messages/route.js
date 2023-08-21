import Message from "@models/Message";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

// create a new message
export const POST = async req => {
  try {
    await connectToDB();

    const { chatId, senderId, text } = await req.json();

    const newMessage = new Message({ chatId, senderId, text });

    const savedMessage = await newMessage.save();

    return NextResponse.json(savedMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
};
