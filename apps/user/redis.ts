import { createClient } from "redis";


export const redisclient = createClient({
  url: "rediss://default:AaJnAAIjcDE0OWIxZTg2YmJkYWY0MzRmOTBmMzA0ZWU3ZjhmNzY2N3AxMA@trusty-lemur-41575.upstash.io:6379"
});

// redisclient.on("error", (err: any) => {
//   throw err;
// });

await redisclient.connect();
