import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, " name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    picturePath: {
      type: String,
      default: "",
      required: [true, "Picture is required"],
    },
    friends: [
      {
        _id: String,
        fullName: String,
        picturePath: String,
      },
    ],
    location: String,
    occupation: String,
    bio: String,
    sessionId: String,
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
