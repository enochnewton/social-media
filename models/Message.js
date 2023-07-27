import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    chatId: {
      type: String,
      required: [true, "Chat ID is required"],
    },
    senderId: {
      type: String,
      required: [true, "Sender ID is required"],
    },
    text: {
      type: String,
      required: [true, "Message text is required"],
    },
  },
  { timestamps: true }
);

const Message = models.Message || model("Message", MessageSchema);

export default Message;
