import { Request, Response } from 'express';
import QueueServices from '@services/QueueServices';
import { EmailTemplate } from '@utils/EmailTemplate';

import * as dotenv from 'dotenv';
import { CategoryEmail } from '../utils/CategoryEmail';

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

    async sendEmail(req: Request, resp: Response): Promise<Response> {
        try {
            const reportName = String(req.body.reportName);
            const category = String(req.body.category);
            const location = String(req.body.location);
            if (reportName !== 'undefined' && category !== 'undefined' && location !== 'undefined') {
                const emailCategory = CategoryEmail[category];
                const emailMessage = this.buildEmailMessage(location, emailCategory);
                this.queueService.addMailQueue(emailMessage);
                this.queueService.emailQueueProcess();
                return resp.sendStatus(200);
            } else {
                return resp.status(400).json({'error': 'error to get email values'});
            }
        } catch {
            return resp.status(400).json({'error': 'error to get email values'});
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