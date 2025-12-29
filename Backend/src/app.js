import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import weekPlanRoutes from "./routes/weekly.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import announcementRoutes from "./routes/announcement.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    credentials: true,
  })
);
app.options(/.*/, cors());

// parse cookies on incoming requests
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/week-plans", weekPlanRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/announcements", announcementRoutes);
app.use("/api/v1/notifications", notificationRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", uptime: process.uptime() });
});

app.use(errorMiddleware);

export default app;
