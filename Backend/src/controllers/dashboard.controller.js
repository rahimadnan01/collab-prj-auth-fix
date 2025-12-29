import { getRoleFromRequest } from "../utils/role.helper.js";

export const getDashboardStats = async (req, res) => {
  const role = getRoleFromRequest(req);

  let stats = {};

  if (role === "student") {
    stats = {
      enrolledCourses: 5,
      completedLabs: 12,
      upcomingDeadlines: 3,
    };
  }

  if (role === "instructor") {
    stats = {
      activeCourses: 3,
      weeklyPlans: 24,
      pendingReviews: 7,
    };
  }

  if (role === "admin") {
    stats = {
      totalUsers: 120,
      totalCourses: 18,
      totalAnnouncements: 9,
    };
  }

  res.status(200).json({
    success: true,
    role,
    data: stats,
  });
};
