import * as redis from "redis";
import * as Queue from 'bull';
import * as dotenv from 'dotenv';

dotenv.config();

const { REDIS_URL } = process.env;

export const sendMailQueue = new Queue('sendMail', REDIS_URL);
// export default class RedisTemplate {
//     // getConnection(): redis.RedisClient {
//     //     const redisClient = redis.createClient(process.env.REDIS_URL);
//     //     return redisClient;
//     // }
// }