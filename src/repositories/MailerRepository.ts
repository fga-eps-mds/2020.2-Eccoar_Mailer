import { Request, Response } from 'express';
import { RedisClient } from 'redis';
import RedisTemplate from '../db';

export default class MailerRepository {
    redisTemplate: RedisTemplate;
    redisConnection: RedisClient;

    constructor() {
        this.redisTemplate = new RedisTemplate();
        this.redisConnection = this.redisTemplate.getConnection()
    }
    
    pong() {
        this.redisConnection.set('ping', 'pong');
        this.redisConnection.get('ping');
    }
}