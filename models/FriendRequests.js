import { Schema, model, models } from "mongoose";

const FriendRequests = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const FriendRequest =
  models.FriendRequests || model("FriendRequests", FriendRequests);

export default FriendRequest;
