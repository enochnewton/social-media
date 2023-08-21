import Chat from "@models/Chat";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const { id } = params;

    const foundChat = await Chat.findById(id);

    if (!foundChat)
      return NextResponse.json({ message: "Chat not found" }, { status: 404 });

    return NextResponse.json(foundChat, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
};
