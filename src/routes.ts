import { NextFunction } from 'connect';
import { Router, Request, Response } from 'express';

import ControllerMailer from '@controllers/ControllerMailer';

const routers = Router();
const controller = new ControllerMailer();

routers.get("/api/ping", (req: Request, resp: Response, next: NextFunction) => {
    try {
        controller.pong(req, resp);
    } catch(err) {
        next(err);
    }
});

routers.post("/api/sendMail", (req: Request, resp: Response, next: NextFunction) => {
    controller.sendEmail(req, resp, next);
});

export default routers;
