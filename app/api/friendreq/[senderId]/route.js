import FriendRequest from "@models/FriendRequests";
import User from "@models/User";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const { senderId } = params;
    console.log({ senderId });

    // get all users
    const users = await User.find({});

    // remove sender from users
    const filteredUsers = users.filter(
      user => user._id.toString() !== senderId
    );

    // get all friend requests sent by sender
    const sentFriendRequests = await FriendRequest.find({
      $or: [{ senderId: senderId }, { receiverId: senderId }],
    });

    // get sender's friends
    const sender = await User.findById(senderId);
    const senderFriends = sender.friends;

    // remove users who are already friends with sender from filtered users
    // 1. Loop through each friend of the sender
    senderFriends.forEach(friend => {
      // 2. Loop through each user in the list of filtered users
      filteredUsers.forEach((user, index) => {
        // 3. If the user id of the friend matches the user id of the user, remove the user from the list of filtered users
        if (user._id.toString() === friend._id.toString()) {
          filteredUsers.splice(index, 1);
        }
      });
    });

    // remove users who have already received a friend request from sender
    // 1. Loop through each sent friend request
    sentFriendRequests.forEach(sentFriendRequest => {
      // 2. Loop through each user in the list of filtered users
      filteredUsers.forEach((user, index) => {
        // 3. If the user id of the sent friend request matches the user id of the user, remove the user from the list of filtered users
        if (
          user._id.toString() === sentFriendRequest.senderId._id.toString() ||
          user._id.toString() === sentFriendRequest.receiverId.toString()
        ) {
          filteredUsers.splice(index, 1);
        }
      });
    });

    return NextResponse.json(filteredUsers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
