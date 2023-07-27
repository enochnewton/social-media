import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
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
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    bio: String,
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
