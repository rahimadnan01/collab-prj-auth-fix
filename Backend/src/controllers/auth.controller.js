import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateToken } from "../utils/generateTokens.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      throw new ApiError(400, "All fields are required");
    }

    if (password !== confirmPassword) {
      throw new ApiError(400, "Passwords do not match");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "Email already registered");
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    const token = generateToken(user);

    res.status(201).json(
      new ApiResponse(201, {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      }, "Account created successfully")
    );

  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid credentials");
    }

    const token = generateToken(user);

    res.status(200).json(
      new ApiResponse(200, {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      }, "Login successful")
    );

  } catch (error) {
    next(error);
  }
};
