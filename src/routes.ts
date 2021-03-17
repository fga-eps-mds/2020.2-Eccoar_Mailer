import { Router, Request, Response } from 'express';

import ControllerMailer from './controllers/ControllerMailer';

const routers = Router();
const controller = new ControllerMailer();

routers.get("/api/ping", (req: Request, resp: Response) => {
    controller.pong(req, resp);
});

routers.get("/api/redis/ping", (req: Request, resp: Response) => {
    controller.redisPong(req, resp);
});

routers.get("/api/sendMail", (req: Request, resp: Response) => {
    controller.sendEmail(req, resp);
});

export default routers;