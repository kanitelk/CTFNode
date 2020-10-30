import mongoose, { Schema } from "mongoose";

export type FlagDocument = mongoose.Document & {
  task: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  value: string;
  isRight: boolean;
};

const flagSchema = new mongoose.Schema(
  {
    task: { type: Schema.Types.ObjectId, ref: "Task" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    value: String,
    isRight: Boolean,
  },
  {
    timestamps: true,
  }
);

export const Flag = mongoose.model<FlagDocument>("Flag", flagSchema);
