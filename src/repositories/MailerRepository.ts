import { RedisClient } from 'redis';
import RedisTemplate from '../db';

export default class MailerRepository {
    redisTemplate: RedisTemplate;
    redisConnection: RedisClient;

    constructor() {
        this.redisTemplate = new RedisTemplate();
        this.redisConnection = this.redisTemplate.getConnection();
    }

    async pong(): Promise<string> {
        this.redisConnection.set('ping', 'pong');
        const result: string = await new Promise((resolve, reject) => {
            this.redisConnection.get("ping", (e, data) => {
                if (e) {
                    reject(e);
                }
                resolve(data);
            });
        });
        return result;
    }
}