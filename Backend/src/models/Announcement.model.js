import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    createdByRole: {
      type: String,
      enum: ["admin", "instructor"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Announcement = mongoose.model(
  "Announcement",
  announcementSchema
);
