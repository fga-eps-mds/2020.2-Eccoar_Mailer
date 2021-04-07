import { NodeMailerProvider } from "../src/services/NodeMailerProvider";
import { EmailTemplate } from "../src/utils/EmailTemplate";

const mockSendMail = jest.fn((_email, callback) => callback());

const mockTransport = () => ({
    sendMail: mockSendMail,
    close: jest.fn()
});

jest.mock('nodemailer', () => ({
    ...(jest.requireActual('nodemailer')),
    createTransport: jest.fn(() => mockTransport())
}));

describe("Send email", () => {

    test("Successfully send email", async () => {
        process.env = {
            EMAIL: 'mock@email.com',
            PASS: 'mockPassword'
        };

        const mockTransport = () => ({
            sendMail: mockSendMail,
            close: jest.fn()
        });
        
        jest.mock('nodemailer', () => ({
            ...(jest.requireActual('nodemailer')),
            createTransport: jest.fn(() => mockTransport())
        }));

        const nodeMailerProvider = new NodeMailerProvider();
        const emailOptions = {
            from: 'mockFrom',
            subject: 'mockSubject',
            text: 'mockText',
            to: 'mockTo'
        } as EmailTemplate;
        await nodeMailerProvider.sendMail(emailOptions);
        expect(mockSendMail).toHaveBeenCalled();
    });

    test("Fail to send email", async () => {
        process.env = {
            EMAIL: 'mock@email.com',
            PASS: 'mockPassword'
        };

        const nodeMailerProvider = new NodeMailerProvider();
        const emailOptions = {
            from: 'mockFrom',
            subject: 'mockSubject',
            text: 'mockText',
            to: 'mockTo'
        } as EmailTemplate;
        await nodeMailerProvider.sendMail(emailOptions);
        expect(mockSendMail).toThrow();
    });
});