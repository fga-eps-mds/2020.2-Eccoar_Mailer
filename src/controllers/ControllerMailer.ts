import { Request, Response } from 'express';
import QueueServices from '../services/QueueServices';
import { MailerProvider } from '../services/MailerProvider';
import { NodeMailerProvider } from '../services/NodeMailerProvider';
import { configsEmail } from '../utils/configsEmail';

export default class ControllerMailer {
    mailerProvider: MailerProvider;

    constructor() {
        this.mailerProvider = new NodeMailerProvider(configsEmail);
    }

    pong(req: Request, resp: Response): void {
        const pingPong = {
            ping: "pong"
        }
        resp.status(200).json(pingPong);
    }

    async redisPong(req: Request, resp: Response): Promise<void> {
        const mailerRepository = new QueueServices();
        const responsePong = await mailerRepository.addMailQueue({'ping': 'pong'});
        const response = {
            ping: responsePong,
        }
        mailerRepository.emailQueueProcess();
        resp.status(200).json(response);
    }

    sendEmail(req: Request, resp: Response): void {

        const toEmail = String(req.query.toEmail);
        const title = String(req.query.title);
        const description = String(req.query.description);

        const emailMessage = this.buildEmailMessage(toEmail, title, description);

       const mailerRepository = new QueueServices();

       mailerRepository.addMailQueue(emailMessage);
       mailerRepository.emailQueueProcess();

    }

    buildEmailMessage(email: string, subject: string, text: string): object {
        return {
            from: configsEmail.auth.user,
            to: email,
            subject: subject,
            text: text
        }
    }
}