import * as Queue from 'bull';
import { NodeMailerProvider } from '../services/NodeMailerProvider';
import { MailerProvider } from '../services/MailerProvider';
import * as env from 'dotenv';
import { EmailTemplate } from '../utils/EmailTemplate';

env.config();

const { REDIS_URL } = process.env;

export default class QueueServices {
	mailerProvider: MailerProvider;
	queue: Queue.Queue;

	constructor() {
		this.queue = new Queue('send-email-queue', REDIS_URL);
		this.mailerProvider = new NodeMailerProvider();
	}

	addMailQueue(email: EmailTemplate, options: Queue.JobOptions): void {
		this.queue.add(email, options);
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
					job.moveToFailed({ message: 'job failed' });
				});
		});
	}
}
