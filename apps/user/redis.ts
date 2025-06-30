import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

export const redisclient = createClient({
  url: process.env.REDIS_URL,
});

redisclient.on("error", (err) => {
  console.error("Redis error:", err);
});

export async function connectRedis() {
  if (!redisclient.isOpen) {
    await redisclient.connect();
    console.log("Redis connected!");
  }
}
