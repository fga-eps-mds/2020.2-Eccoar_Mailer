import { MailerProvider } from './MailerProvider';
import * as nodemailer from 'nodemailer';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as nodemailerSendgrid from 'nodemailer-sendgrid-transport';
import { EmailTemplate } from '@utils/EmailTemplate';
import * as dotenv from 'dotenv';

dotenv.config();

export class NodeMailerProvider implements MailerProvider {
	transporter: nodemailer.Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport(
			nodemailerSendgrid({
				auth: {
					api_key: process.env.SENDGRID_KEY,
				},
			}),
		);
	}

	async sendMail(email: EmailTemplate): Promise<void> {
		console.log('>>>>> SEND EMAIL');
		return new Promise((resolve, reject) => {
			this.transporter.sendMail(email, (err, response) => {
				if (err) {
					reject(err);
				}
				resolve(response);
			});
			this.transporter.close();
		});
	}
}
