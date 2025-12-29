import { ApiError } from "../utils/ApiError.js";
import { WeekPlan } from "../models/WeeklyPlan.model.js";

export const createWeekPlan = async (req, res, next) => {
  try {
    const { course, weekNumber, theoryTopic, labTask, learningOutcome } = req.body;

    if (!course || !weekNumber) {
      return res.status(400).json({
        success: false,
        message: "Course and week number are required",
      });
    }

    // Normalize and validate week number
    const weekNum = Number(weekNumber);
    if (isNaN(weekNum) || weekNum < 1) {
      return res.status(400).json({ success: false, message: "Invalid week number" });
    }

   
    const exists = await WeekPlan.findOne({ course, weekNumber: weekNum });
    if (exists) {
      return res.status(409).json({ success: false, message: "Week plan already exists for this course and week" });
    }

    const weekPlan = await WeekPlan.create({
      course,
      weekNumber: weekNum,
      theoryTopic,
      labTask,
      learningOutcome,
    });

    res.status(201).json({
      success: true,
      message: "Week plan created successfully",
      data: weekPlan,
    });

  } catch (error) {
    if (error.code === 11000) {
      return next(new ApiError(409, "Week plan already exists"));
    }
    next(new ApiError(400, error.message));
  }
};


export const getAllWeekPlans = async (req, res, next) => {
  try {
    const plans = await WeekPlan.find({})
      .populate("course", "name semester")
      .sort({ "course.name": 1, weekNumber: 1 });

    res.status(200).json({ success: true, data: plans });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};


export const getWeekPlansByCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const plans = await WeekPlan.find({ course: courseId })
      .populate("course", "name semester")
      .sort({ weekNumber: 1 });

    res.status(200).json({
      success: true,
      data: plans,
    });

  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const updateWeekPlan = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedPlan = await WeekPlan.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({
        success: false,
        message: "Week plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Week plan updated successfully",
      data: updatedPlan,
    });

  } catch (error) {
    next(new ApiError(505, error.message));
  }
};

export const deleteWeekPlan = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedPlan = await WeekPlan.findByIdAndDelete(id);

    if (!deletedPlan) {
      return res.status(404).json({
        success: false,
        message: "Week plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Week plan deleted successfully",
    });

  } catch (error) {
   next(new ApiError(500, error.message));
  }
};


