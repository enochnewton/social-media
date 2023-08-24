import FriendRequest from "@models/FriendRequests";
import User from "@models/User";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

// get friend requests
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const { id } = params;
    const friendRequests = await FriendRequest.find({
      receiverId: id,
      status: "pending",
    })
      .populate("senderId", "picturePath fullName")
      .exec();

    return NextResponse.json(friendRequests, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

// Export the PATCH function
export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();

    const { id } = params;
    const { status } = await req.json();

    // Find the friend request by id
    const friendRequest = await FriendRequest.findById(id).exec();

    // If the friend request does not exist, return a 404 error
    if (!friendRequest)
      return NextResponse.json(
        { message: "Friend request not found" },
        { status: 404 }
      );

    // Set the status of the friend request to the new status
    friendRequest.status = status;

    await friendRequest.save();

    // Find the sender of the friend request
    const sender = await User.findById(friendRequest.senderId).exec();

    // Find the receiver of the friend request
    const receiver = await User.findById(friendRequest.receiverId).exec();

    if (status === "accepted") {
      // check if the sender and the receiver are already friends
      const senderIsFriend = sender.friends.find(
        friend => friend._id.toString() === receiver._id.toString()
      );

      const receiverIsFriend = receiver.friends.find(
        friend => friend._id.toString() === sender._id.toString()
      );

      // If the sender and the receiver are already friends, return a 400 error
      if (senderIsFriend && receiverIsFriend)
        return NextResponse.json(
          { message: "You are already friends" },
          { status: 400 }
        );

      // Add the receiver to the sender's friends array
      sender.friends.push({
        _id: receiver._id,
        picturePath: receiver.picturePath,
        fullName: receiver.fullName,
      });

      // Add the sender to the receiver's friends array
      receiver.friends.push({
        _id: sender._id,
        picturePath: sender.picturePath,
        fullName: sender.fullName,
      });

      // Save the sender and the receiver
      await sender.save();
      await receiver.save();

      // Delete the friend request
      await FriendRequest.findByIdAndDelete(id);

      // Return a success message
      return NextResponse.json(
        { message: "Friend request accepted" },
        { status: 200 }
      );
    } else if (status === "rejected") {
      // Delete the friend request
      await FriendRequest.findByIdAndDelete(id);

      // Return a success message
      return NextResponse.json(
        { message: "Friend request rejected" },
        { status: 200 }
      );
    }

    // Return a 400 error if the status is not accepted or rejected
    return NextResponse.json({ message: "Invalid status" }, { status: 400 });
  } catch (error) {
    // Return a 500 error if there is an error
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
