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

    redisPong(req: Request, resp: Response): void {
        const mailerRepository = new QueueServices();
        const responsePong = mailerRepository.addMailQueue({'from': 'ping', 'subject': 'pong', 'text': 'ping', 'to': 'pong'});
        const response = {
            ping: responsePong,
        }
        mailerRepository.emailQueueProcess();
        resp.status(200).json(response);
    }

    sendEmail(req: Request, resp: Response): void {
        const email = String(req.query.email);
        const subject = String(req.query.subject);
        const text = String(req.query.text);
        console.log(email !== undefined);
        if (email !== 'undefined' && subject !== 'undefined' && text !== 'undefined') {
            console.log(email);
            const emailMessage = this.buildEmailMessage(email, subject, text);
            const mailerRepository = new QueueServices();
            mailerRepository.addMailQueue(emailMessage);
            mailerRepository.emailQueueProcess();
            resp.sendStatus(200);
        } else {
            console.log(email)
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