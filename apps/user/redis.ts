import dotenv from "dotenv";
import { env } from "process";
import { createClient } from "redis";

dotenv.config();


export const redisclient = createClient({
  url: process.env.REDIS_URL,
});

redisclient.on("error", (err) => {
  console.error("Redis error:", err);
  throw err;
});

await redisclient.connect();

(async () => {
  await redisclient.connect();
})();

