import { NextFunction, Request, Response } from 'express';
import QueueServices from '@services/QueueServices';
import { EmailTemplate } from '@utils/EmailTemplate';

import * as dotenv from 'dotenv';
import { CategoryEmail } from '@utils/CategoryEmail';
import { BadRequest } from '@utils/errors';

dotenv.config();

export default class ControllerMailer {
    
    queueService: QueueServices;
    
    constructor() {
        this.queueService = new QueueServices();
    }

    pong(req: Request, resp: Response): void {
        const pingPong = {
            ping: 'pong',
        };
        resp.status(200).json(pingPong);
    }

    async sendEmail(req: Request, resp: Response, next: NextFunction): Promise<Response> {
        try {
            const reportName = String(req.body.reportName);
            const category = String(req.body.category);
            const location = String(req.body.location);
            if(!reportName || !category || !location) {
                const missingFields = [];
                if(!reportName) missingFields.push('reportName');
                if(!category) missingFields.push('category');
                if(!location) missingFields.push('location');
                throw new BadRequest(`Missing fields ${missingFields}`);
            }
    
            const emailCategory = CategoryEmail[category];
            const emailMessage = this.buildEmailMessage(location, emailCategory);
            this.queueService.addMailQueue(emailMessage);
            this.queueService.emailQueueProcess();
            return resp.sendStatus(200);
        } catch (err) {
            next(err);
        }
    }

    buildEmailMessage(location: string, emailCategory: string): EmailTemplate {
        return {
            from: process.env.EMAIL,
            to: emailCategory,
            subject: `RELATÓRIO ECCOAR ${new Date().toDateString()}`,
            text: `Aqui está o seu relatório do projeto eccoar\nLink: ${location}`
        }
    }
}