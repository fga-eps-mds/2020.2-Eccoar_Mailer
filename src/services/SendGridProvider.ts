import { MailerProvider } from './MailerProvider';
import * as sgMail from '@sendgrid/mail';
import { EmailTemplate } from '@utils/EmailTemplate';

export class SendGridProvider implements MailerProvider {
	constructor() {
		sgMail.setApiKey(process.env.SENDGRID_KEY);
	}

	async sendMail(email: EmailTemplate): Promise<void> {
		console.log('>>>>> SEND EMAIL');
		return new Promise((resolve, reject) => {
			sgMail
				.send(email)
				.then((response) => {
					resolve(response[0].headers);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}
