import { createClient } from "redis";


export const redisclient = createClient({
  url: `${process.env.REDIS_URL}`
});

// redisclient.on("error", (err: any) => {
//   throw err;
// });

await redisclient.connect();
