import { Announcement } from "../models/Announcement.model.js";
import { getRoleFromRequest } from "../utils/role.helper.js";

export const createAnnouncement = async (req, res) => {
  const role = getRoleFromRequest(req);

  if (!["admin", "instructor"].includes(role)) {
    return res.status(403).json({
      success: false,
      message: "Permission denied",
    });
  }

  const announcement = await Announcement.create({
    ...req.body,
    createdByRole: role,
  });

  res.status(201).json({
    success: true,
    data: announcement,
  });
};

export const getAnnouncements = async (req, res) => {
  const announcements = await Announcement.find()
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: announcements,
  });
};
