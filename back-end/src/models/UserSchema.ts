import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
  login: string,
  email: string,
  password: string,
  role: UserRole
};

const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      index: true,
      unique: true,
      required: true
    },
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    }
  },
  {
    timestamps: true
  }
);

export enum UserRole {
  admin = "admin",
  user = "user"
}

export const User = mongoose.model<UserDocument>("User", userSchema)
