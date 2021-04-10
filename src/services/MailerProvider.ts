import { EmailTemplate } from '@utils/EmailTemplate';

export interface MailerProvider {
	sendMail(email: EmailTemplate): Promise<void>;
}
