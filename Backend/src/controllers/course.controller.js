import { Course } from "../models/Course.model.js";

export const createCourse = async (req, res, next) => {
  try {
    const { name, type, creditHours, semester, prerequisites } = req.body;

    if (!name || !type || !creditHours || !semester) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const course = await Course.create({
      name,
      type,
      creditHours,
      semester,
      prerequisites,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

export const getCourses = async (req, res, next) => {
  try {
    
    const { semester, type } = req.query;

    const filter = {};
    if (semester) filter.semester = semester;
    if (type) filter.type = type;

    const courses = await Course.find(filter).sort({ semester: 1, name: 1 });

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    next(new ApiError(400, error.message));
  }
};

export const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};
