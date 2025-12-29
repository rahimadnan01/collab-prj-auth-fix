import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: String,
    message: String,
    userRole: {
      type: String,
      enum: ["student", "instructor", "admin"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model(
  "Notification",
  notificationSchema
);
