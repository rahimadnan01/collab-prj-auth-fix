import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
} from "../controllers/announcement.controller.js";

const router = express.Router();

router.get("/", getAnnouncements);
router.post("/", createAnnouncement);

export default router;
