import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema({
  text: {
    type: String,
    required: [true, "Comment text is required"],
  },
  likes: {
    type: Map,
    of: Boolean,
    default: {},
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const PostSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    text: {
      type: String,
      required: [true, "Post text is required"],
    },
    likes: {
      type: Map,
      of: Boolean,
      default: {},
    },
    picturePath: {
      type: String,
      required: [true, "Picture path is required"],
    },
    userPicturePath: {
      type: String,
      required: [true, "User picture path is required"],
    },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
