import * as Queue from 'bull';
import { MailerProvider } from '@services/MailerProvider';
import * as env from 'dotenv';
import { EmailTemplate } from '@utils/EmailTemplate';
import { factoryMailer } from '@utils/factoryMailer';

env.config();

const { REDIS_URL } = process.env;

export default class QueueServices {
	mailerProvider: MailerProvider;
	queue: Queue.Queue;
	options: Record<string, number>;

	constructor() {
		this.options = { attemps: 3, delay: 60000, static: 5000 };
		this.queue = new Queue('send-email-queue', REDIS_URL);
		this.mailerProvider = factoryMailer();
	}

	addMailQueue(email: EmailTemplate): void {
		this.queue.add(email, this.options);
	}

	emailQueueProcess(): void {
		this.queue.process(async (job) => {
			console.log('>>>>> Process Job to Send EMAIL');
			await this.mailerProvider
				.sendMail(job.data)
				.then(() => {
					console.log('>>>>> Finish Send Email');
					job.moveToCompleted('done', true);
				})
				.catch((err) => {
					console.log('>>>> Job Failed: ' + err.message);
					job.moveToFailed({ message: err.message });
				});
		});
	}
}
