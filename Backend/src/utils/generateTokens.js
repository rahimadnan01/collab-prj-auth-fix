import { ApiError } from "./ApiError.js";
import { User } from "../models/User.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  // Validate user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found for this Id");
  }

  // Generate tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  if (!accessToken || !refreshToken) {
    throw new ApiError(500, "Failed to generate tokens");
  }

  // Persist refresh token in a single update (avoids saving the whole doc twice)
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { refreshToken } },
      { new: true }
    ).select("+refreshToken");

    if (!updatedUser) {
      throw new ApiError(500, "Failed to update refreshToken");
    }

    return { accessToken, refreshToken };
  } catch (err) {
    // Preserve original message and return a 500 if it's an unexpected error
    const message = err?.message || "Failed to persist refresh token";
    throw new ApiError(500, message);
  }
};

export { generateAccessAndRefreshToken };
