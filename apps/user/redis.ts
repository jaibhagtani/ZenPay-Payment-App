import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error("REDIS_URL is not defined");
}

export const redisclient = createClient({
  url: redisUrl,
});

redisclient.on("error", (err) => {
  console.error("Redis error:", err);
  throw err;
});

(async () => {
  await redisclient.connect();
})();
