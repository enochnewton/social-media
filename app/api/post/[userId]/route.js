import Post from "@models/Post";
import User from "@models/User";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const foundPosts = await Post.find({ userId: params.userId });

    if (!foundPosts) return new Response("Posts not found", { status: 404 });

    return new Response(JSON.stringify(foundPosts), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

// post comment
export const POST = async (req, { params }) => {
  try {
    await connectToDB();

    const { userId } = params;
    const { postId, text } = await req.json();
    const foundPost = await Post.findById(postId);

    if (!foundPost) return new Response("Post not found", { status: 404 });

    const newComment = {
      text,
      user: userId,
    };

    foundPost.comments.unshift(newComment);
    await foundPost.save();

    // Populate user's data after saving the post
    const updatedPost = await Post.findById(postId)
      .populate("comments.user", "picturePath fullName")
      .exec();

    return NextResponse.json(updatedPost, { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};

// like or dislike a comment
export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();

    const { userId } = params;
    const { postId, commentId } = await req.json();
    const foundPost = await Post.findById(postId).exec();
    if (!foundPost)
      return NextResponse.json({ message: "Post not found" }, { status: 404 });

    const foundComment = foundPost.comments.find(
      comment => comment._id.toString() === commentId
    );
    console.log(foundComment);

    if (!foundComment)
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );

    const isLiked = foundComment.likes.get(userId);

    if (isLiked) {
      foundComment.likes.delete(userId);
    } else {
      foundComment.likes.set(userId, true);
    }

    await foundPost.save();

    // Populate user's data after saving the post
    const updatedPost = await Post.findById(postId)
      .populate("comments.user", "picturePath fullName")
      .exec();

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
