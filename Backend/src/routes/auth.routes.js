import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/signup", wrapAsync(signup));
router.post("/login", wrapAsync(login));
router.post("/logout", verifyJwt(), wrapAsync(logout));

export default router;
