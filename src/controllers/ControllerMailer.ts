import { Request, Response } from 'express';
import MailerRepository from '../repositories/MailerRepository';

export default class ControllerMailer {
    pong(req: Request, resp: Response) {
        const pingPong = {
            ping: "pong"
        }
        resp.status(200).json(pingPong);
    }

    redisPong(req: Request, resp: Response) {
        const mailerRepository = new MailerRepository();
        const response = mailerRepository.pong();
        resp.status(200).json(response);
    }
}