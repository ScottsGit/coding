import redis from "./redisClient";

const cacheMiddleware = {
  get: async (key: string): Promise<any | null> => {
    try {
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error("Error getting data from Redis", err);
      return null;
    }
  },
  set: async (key: string, value: any, ttl: number = 3600): Promise<void> => {
    // ttl in seconds (default 1 hour)
    try {
      await redis.set(key, JSON.stringify(value), "EX", ttl);
    } catch (err) {
      console.error("Error setting data to Redis", err);
    }
  },
};

export default cacheMiddleware;
