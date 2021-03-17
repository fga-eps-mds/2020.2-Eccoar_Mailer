import { MailerProvider } from "./MailerProvider";
import * as nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

export class NodeMailerProvider implements MailerProvider {  
    nodeMailerProvider: Mail;

    constructor(configs: object) {
        this.nodeMailerProvider = nodemailer.createTransport(configs);
    }

    sendMail(description: object): void {
        this.nodeMailerProvider.sendMail(description, (err, response) => {
            if(err) {
                throw new Error(err.message);
            } 
            console.log(response);
        });
        this.nodeMailerProvider.close();
    }
}