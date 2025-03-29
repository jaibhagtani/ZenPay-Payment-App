import { createClient } from "redis"

const redisUrl = process.env.REDIS_URL;

export const redisclient = createClient ({
  url : redisUrl
});

await redisclient.connect()

redisclient.on("error", function(err :any) {
  throw err;
});

