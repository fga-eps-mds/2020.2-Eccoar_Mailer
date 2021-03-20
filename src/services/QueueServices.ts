import { sendMailQueue } from '../db';
import Queue from 'bull';
import { NodeMailerProvider } from '../services/NodeMailerProvider';
import { configsEmail } from '../utils/configsEmail';
import { Response } from 'express';


export default class QueueServices {
    redisTemplate: Queue.Queue;
    mailerProvider: NodeMailerProvider;

    constructor() {
        this.redisTemplate = sendMailQueue;
        this.mailerProvider = new NodeMailerProvider(configsEmail);
    }

    async addMailQueue(email: object): Promise<void> {
        this.redisTemplate.add(email);
    }

    async emailQueueProcess(resp: Response): Promise<void> {
        // n utilizar essa linha
        this.redisTemplate.process((job) => {
            console.log(job.data)
            
            try {
                this.mailerProvider.sendMail(job.data);
                resp.sendStatus(200);
            } catch (err) {
                resp.sendStatus(400);
            }
        });
    }
}