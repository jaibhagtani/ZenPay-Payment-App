import { createClient } from "redis"

const redisUrl = process.env.REDIS_URL;

export const redisclient = createClient ({
  url : `${process.env.REDIS_URL}'
});


redisclient.on("error", function(err :any) {
  throw err;
});

await redisclient.connect()
