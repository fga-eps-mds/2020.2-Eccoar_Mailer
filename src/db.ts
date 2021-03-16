import * as redis from "redis";

export default class RedisTemplate {
    getConnection(): redis.RedisClient {
        const redisClient = redis.createClient(process.env.REDIS_URL);
        return redisClient;
    }
}