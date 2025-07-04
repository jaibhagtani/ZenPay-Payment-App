import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();
const redisURL = process.env.REDIS_URL;
// console.log(redisURL);
const redisclient = createClient({
  url: redisURL,
});

redisclient.on("error", (err) => {
  console.error("Redis error:", err);
});
// yaha pr galti hui thi 
export async function connectRedis() {
  if (!redisclient.isOpen) {
    await redisclient.connect();
  }
}

export { redisclient };
