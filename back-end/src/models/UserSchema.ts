import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
  login: string,
  email: string,
  password: string,
  role: UserRole,
  score: number,
  createdAt: Date,
  updatedAt: Date
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
    },
    score: {
      type: Number,
      default: 0
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
