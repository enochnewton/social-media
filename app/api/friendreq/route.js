import FriendRequest from "@models/FriendRequests";
import User from "@models/User";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

// create friend request
export const POST = async req => {
  try {
    await connectToDB();

    const { senderId, receiverId } = await req.json();

    const newFriendRequest = new FriendRequest({
      senderId,
      receiverId,
    });

    await newFriendRequest.save();

    return NextResponse.json(
      { message: "Friend request sent" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
