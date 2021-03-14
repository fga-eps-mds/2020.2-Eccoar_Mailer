import * as redis from "redis";

export default class RedisTemplate {
    getConnection () {
        const redisClient = redis.createClient(process.env.REDIS_URL);
        return redisClient;
    }
}