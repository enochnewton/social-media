import { Schema, model, models } from "mongoose";

const ChatSchema = new Schema(
  {
    userIds: {
      type: Array,
      required: [true, "User IDs are required"],
    },
  },
  { timestamps: true }
);

const Chat = models.Chat || model("Chat", ChatSchema);

export default Chat;
