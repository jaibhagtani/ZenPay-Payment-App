import Redis from "ioredis"

export const redisclient = new Redis(`${process.env.REDIS_URL}`);
