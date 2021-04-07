import { MailerProvider } from './MailerProvider';
import * as nodemailer from 'nodemailer';
import { EmailTemplate } from '@utils/EmailTemplate';
import * as dotenv from 'dotenv';

dotenv.config();

export class NodeMailerProvider implements MailerProvider {
    transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SERVICE,
            logger: true,
            secure: true,
            requireTLS: true,
            port: 465,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            },
        });
    }

    async sendMail(email: EmailTemplate): Promise<void> {
        console.log(">>>>> SEND EMAIL");
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
