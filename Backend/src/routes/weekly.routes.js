import express from "express";
import {
  createWeekPlan,
  getAllWeekPlans,
  getWeekPlansByCourse,
  updateWeekPlan,
  deleteWeekPlan,
} from "../controllers/weekly.controller.js";

const router = express.Router();

router.post("/", createWeekPlan);
router.get("/", getAllWeekPlans);
router.get("/course/:courseId", getWeekPlansByCourse);
router.put("/:id", updateWeekPlan);
router.delete("/:id", deleteWeekPlan);

export default router;
