import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

console.log("REDIS_URL:", process.env.REDIS_URL);
if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is not defined");
}

export const redisclient = createClient({
  url: `${process.env.REDIS_URL}`,
});

redisclient.on("error", (err) => {
  console.error("Redis error:", err);
  throw err;
});

await redisclient.connect();
