import { Request, Response } from 'express';
import MailerRepository from '../repositories/MailerRepository';
import { MailerProvider } from '../services/MailerProvider';
import { NodeMailerProvider } from '../services/NodeMailerProvider';
import { configsEmail } from '../utils/configsEmail';

export default class ControllerMailer {
    mailerProvider: MailerProvider;
    
    constructor() {
        console.log(configsEmail);
        this.mailerProvider = new NodeMailerProvider(configsEmail);
    }

    pong(req: Request, resp: Response): void{
        const pingPong = {
            ping: "pong"
        }
        resp.status(200).json(pingPong);
    }

    async redisPong(req: Request, resp: Response): Promise<void> {
        const mailerRepository = new MailerRepository();
        const responsePong = await mailerRepository.pong();
        const response = {
            ping: responsePong,
        }
        resp.status(200).json(response);
    }
    
    sendEmail(req: Request, resp: Response): void{
        const emailMessage = this.buildEmailMessage(req.query.toEmail, req.query.title, req.query.description);
        try {
            this.mailerProvider.sendMail(emailMessage);
            resp.sendStatus(200);
        } catch (err) {
            resp.status(400).json('{error: error to send e-mail}');
        }
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