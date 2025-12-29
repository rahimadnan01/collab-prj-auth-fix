import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["theory", "lab"],
      required: true,
    },

    creditHours: {
      type: Number,
      required: true,
      min: 1,
    },

    semester: {
      type: Number,
      required: true,
    },

    prerequisites: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
