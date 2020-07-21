import mongoose from "mongoose";

export type TaskDocument = mongoose.Document & {
  title: string,
  content: string,
  visible: boolean,
  categories: string,
  images: string[],
  files: string[],
  flag: string,
  score: number
};

const taskSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    categories: String,
    visible: {
      type: Boolean,
      default: false
    },
    images: [String],
    files: [String],
    flag: String,
    score: Number
  },
  {
    timestamps: true
  }
);

export const Task = mongoose.model<TaskDocument>("Task", taskSchema);
