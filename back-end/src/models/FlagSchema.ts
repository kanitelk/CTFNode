import mongoose, { Schema } from 'mongoose';

export type FlagDocument = mongoose.Document & {
  task: mongoose.Types.ObjectId,
  user: mongoose.Types.ObjectId,
  value: string,
  isRight: boolean,
};

const flagSchema = new mongoose.Schema(
  {
    task: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
    value: String,
    isRight: Boolean
  },
  {
    timestamps: true,
  }
);

export const Flag = mongoose.model<FlagDocument>("Flag", flagSchema);
