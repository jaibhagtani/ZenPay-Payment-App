import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;
console.log("REDIS_URL =", process.env.REDIS_URL);
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

await redisclient.connect();
