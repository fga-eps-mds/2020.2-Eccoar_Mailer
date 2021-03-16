import { Request, Response } from 'express';
import MailerRepository from '../repositories/MailerRepository';

export default class ControllerMailer {

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
}