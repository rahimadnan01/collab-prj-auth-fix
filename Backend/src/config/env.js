import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET || "dev_secret_change_me",
    NODE_ENV: process.env.NODE_ENV || "development"
} 