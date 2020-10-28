import mongoose from "mongoose";

export type SettingsDocument = mongoose.Document & {
  title: string;
  is_active: boolean;
  is_competition_date_active: boolean;
  start_date: Date | null;
  end_date: Date | null;
  guests_can_view_tasks: boolean;
  guests_can_view_users: boolean;
  allow_users_register: boolean;
};

const settingsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "MyCTF",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_competition_date_active: {
      type: Boolean,
      default: false,
    },
    start_date: {
      type: Date,
      default: null,
    },
    end_date: {
      type: Date,
      default: null,
    },
    guests_can_view_tasks: {
      type: Boolean,
      default: false,
    },
    guests_can_view_users: {
      type: Boolean,
      default: false,
    },
    allow_users_register: {
      type: Boolean,
      default: false,
    },
  },
  {
    capped: {
      max: 1,
    },
    timestamps: true,
  }
);

export const Settings = mongoose.model<SettingsDocument>(
  "Settings",
  settingsSchema
);
