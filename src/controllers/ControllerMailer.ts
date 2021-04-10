import { Request, Response } from 'express';
import QueueServices from '@services/QueueServices';
import { EmailTemplate } from '@utils/EmailTemplate';

import * as dotenv from 'dotenv';

dotenv.config();

export default class ControllerMailer {
	pong(req: Request, resp: Response): void {
		const pingPong = {
			ping: 'pong',
		};
		resp.status(200).json(pingPong);
	}

	sendEmail(req: Request, resp: Response): void {
		const email = String(req.query.email);
		const subject = String(req.query.subject);
		const text = String(req.query.text);
		if (
			email !== 'undefined' &&
			subject !== 'undefined' &&
			text !== 'undefined'
		) {
			const emailMessage = this.buildEmailMessage(email, subject, text);
			const queueService = new QueueServices();
			const options = { attempts: 2, delay: 5000 };
			queueService.addMailQueue(emailMessage, options);
			queueService.emailQueueProcess();
			resp.sendStatus(200);
		} else {
			resp.status(400).json({ error: 'error to get email values' });
		}
	}

	buildEmailMessage(
		email: string,
		subject: string,
		text: string,
	): EmailTemplate {
		return {
			from: process.env.EMAIL,
			to: email,
			subject: subject,
			text: text,
		};
	}
}
