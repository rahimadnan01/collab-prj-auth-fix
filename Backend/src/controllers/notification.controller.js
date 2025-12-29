import { Notification } from "../models/Notification.model.js";
import { getRoleFromRequest } from "../utils/role.helper.js";

export const getNotifications = async (req, res) => {
  const role = getRoleFromRequest(req);

  const notifications = await Notification.find({
    userRole: role,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: notifications,
  });
};

export const markAsRead = async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, {
    isRead: true,
  });

  res.status(200).json({
    success: true,
    message: "Marked as read",
  });
};
