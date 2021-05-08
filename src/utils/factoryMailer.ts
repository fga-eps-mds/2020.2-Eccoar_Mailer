import { MailerProvider } from '@services/MailerProvider';
import { NodeMailerProvider } from '@services/NodeMailerProvider';
import { SendGridProvider } from '@services/SendGridProvider';
import * as env from 'dotenv';

env.config();

export const factoryMailer = (): MailerProvider => {
	if (process.env.ENVIRONMENT === 'development') {
		return new NodeMailerProvider();
	}
	if (process.env.ENVIRONMENT === 'production') {
		return new SendGridProvider();
	}
};
