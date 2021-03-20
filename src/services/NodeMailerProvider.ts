import { MailerProvider } from "./MailerProvider";
import * as nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

export class NodeMailerProvider implements MailerProvider {  
    nodeMailerProvider: Mail;

    constructor(configs: object) {
        this.nodeMailerProvider = nodemailer.createTransport(configs);
    }

    async sendMail(email: EmailTemplate): Promise<void> {
        console.log(">>>>> SEND EMAIL");
        return new Promise((resolve, reject) => {
                this.nodeMailerProvider.sendMail(email, (err, response) => {
                if(err) {
                    reject(err);
                }
                resolve(response);
            });
            this.nodeMailerProvider.close();
        });
    }
}