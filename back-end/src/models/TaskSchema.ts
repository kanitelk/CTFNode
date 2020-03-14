import mongoose from "mongoose";

export type TaskDocument = mongoose.Document & {
  title: string,
  content: string,
  visible: boolean,
  categories: string,
  images: string[],
  files: string[],
  answer: string
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
    answer: String
  },
  {
    timestamps: true
  }
);

export const Task = mongoose.model<TaskDocument>("Task", taskSchema);
