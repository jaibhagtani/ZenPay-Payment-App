import dotenv from "dotenv";
import Redis from "ioredis";
dotenv.config();

export const redisclient = new Redis(process.env.REDIS_URL || "");

