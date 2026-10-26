import mongoose from "mongoose";

const user_Schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    profileImg: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const Users = mongoose.model("Users", user_Schema);

export default Users;
