import Post from "@models/Post";
import User from "@models/User";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async req => {
  try {
    await connectToDB();

    const { userId, text, picturePath } = req.body;
    const user = await User.findById(userId);
    console.log(req.body);

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      text,
      picturePath,
      userPicturePath: user.picturePath,
    });
    console.log(newPost);

    await newPost.save();

    return NextResponse.json({ message: "Post created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
