import Post from "@models/Post";
import User from "@models/User";
import { connectToDB } from "@utils/database";
import { writeFile, unlink } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";
import { promisify } from "util";

export const POST = async req => {
  const { userId, description, picture, picturePath, email } =
    Object.fromEntries(await req.formData());

  if (!userId || !picturePath)
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });

  const bytes = await picture.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadPath = join(process.cwd(), "public", "uploads", picturePath);
  writeFile(uploadPath, buffer, err => {
    if (err) {
      throw err;
    } else {
      console.log("File written successfully");
    }
  });

  try {
    await connectToDB();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newPost = new Post({
      userId,
      userName: user.fullName,
      text: description,
      email,
      picturePath: uploadPath.replace(/.*public\\uploads\\/, "/uploads/"),
      userPicturePath: user.picturePath,
    });

    await newPost.save();

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const GET = async req => {
  try {
    await connectToDB();

    const posts = await Post.find().populate(
      "comments.user",
      "picturePath fullName"
    );

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

// like or dislike a post

export const PATCH = async req => {
  try {
    await connectToDB();

    const { postId, userId } = await req.json();
    const post = await Post.findById(postId).exec();
    if (!post)
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    ).populate("comments.user", "picturePath fullName");

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const DELETE = async req => {
  try {
    await connectToDB();

    const { postId, picturePath } = await req.json();

    await Post.findByIdAndDelete(postId);

    const unlinkAsync = promisify(unlink); // Promisify the unlink function

    const pictureFullPath = join(process.cwd(), "public", picturePath);
    await unlinkAsync(pictureFullPath); // Use the promisified unlink function

    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
