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
    options: object;

    constructor() {
        this.options = {attemps: 2, delay: 5000}
        this.queue = new Queue('send-email-queue', REDIS_URL, this.options);
        this.mailerProvider = new NodeMailerProvider();
    }

    addMailQueue(email: EmailTemplate): void {
        this.queue.add(email);
    }

    emailQueueProcess(): void {
        this.queue.process(async (job) => {
            console.log(">>>>> Process Job to Send EMAIL");
            await this.mailerProvider.sendMail(job.data).then(() => {
                console.log(">>>>> Finish Send Email");
                job.moveToCompleted('done', true);
            }).catch(err => {
                console.log(">>>> Job Failed: " + err.message);
                job.moveToFailed({message: 'job failed'})
            });
        });
    }
}