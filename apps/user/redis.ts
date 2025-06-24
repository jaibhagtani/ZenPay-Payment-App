import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const redisUrl = "rediss://default:AaJnAAIjcDE0OWIxZTg2YmJkYWY0MzRmOTBmMzA0ZWU3ZjhmNzY2N3AxMA@trusty-lemur-41575.upstash.io:6379";
if (!redisUrl) {
  throw new Error("REDIS_URL is not defined in process.env");
}

export const redisclient = createClient({
  url: redisUrl,
});

redisclient.on("error", (err) => {
  console.error("Redis error:", err);
  throw err;
});

await redisclient.connect();

(async () => {
  await redisclient.connect();
})();

