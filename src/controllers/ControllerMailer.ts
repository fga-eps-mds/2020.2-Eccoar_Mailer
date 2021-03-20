import { Request, Response } from 'express';
import QueueServices from '../services/QueueServices';
import { configsEmail } from '../utils/configsEmail';
import { EmailTemplate } from '../utils/EmailTemplate';

export default class ControllerMailer {

    pong(req: Request, resp: Response): void {
        const pingPong = {
            ping: "pong"
        }
        resp.status(200).json(pingPong);
    }

    sendEmail(req: Request, resp: Response): void {
        const email = String(req.query.email);
        const subject = String(req.query.subject);
        const text = String(req.query.text);
        if (email !== 'undefined' && subject !== 'undefined' && text !== 'undefined') {
            const emailMessage = this.buildEmailMessage(email, subject, text);
            const queueService = new QueueServices();
            queueService.addMailQueue(emailMessage);
            queueService.emailQueueProcess();
            resp.sendStatus(200);
        } else {
            resp.status(400).json({'error': 'error to get email values'});
        }
    }

    buildEmailMessage(email: string, subject: string, text: string): EmailTemplate {
        return {
            from: configsEmail.auth.user,
            to: email,
            subject: subject,
            text: text
        }
    }
}