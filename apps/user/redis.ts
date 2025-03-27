import { createClient } from "redis"

const redisUrl = process.env.REDIS_URL;
export const redisclient = createClient ({
  url : redisUrl
});

redisclient.on("error", function(err :any) {
  throw err;
});
