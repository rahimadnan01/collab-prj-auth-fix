import mongoose from "mongoose";

const weekPlanSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    weekNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 52, 
    },

    theoryTopic: {
      type: String,
      trim: true,
    },

    labTask: {
      type: String,
      trim: true,
    },

    learningOutcome: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);


weekPlanSchema.index({ course: 1, weekNumber: 1 }, { unique: true });

export const WeekPlan = mongoose.model("WeekPlan", weekPlanSchema);
