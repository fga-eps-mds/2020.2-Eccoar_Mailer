import { SendGridProvider } from '@services/SendGridProvider';
import { NodeMailerProvider } from '../src/services/NodeMailerProvider';
import { EmailTemplate } from '../src/utils/EmailTemplate';

const mockSendMail = jest.fn((_email, callback) => callback());

const mockTransport = () => ({
	sendMail: mockSendMail,
	close: jest.fn(),
});

jest.mock('nodemailer', () => ({
	...jest.requireActual('nodemailer'),
	createTransport: jest.fn(() => mockTransport()),
}));

jest.mock('@sendgrid/mail', () => ({
	...jest.requireActual('@sendgrid/mail'),
	setApiKey: jest.fn(),
	send: jest.fn(async (email) => {
		const response = [{ headers: jest.fn() }];
		return Promise.resolve(response);
	}),
}));

describe('Send email development', () => {
	process.env = {
		ENVIRONMENT: 'development',
		EMAIL: 'mock@email.com',
		PASS: 'mockPassword',
	};

	test('Successfully send email', async () => {
		const nodeMailerProvider = new NodeMailerProvider();
		const emailOptions = {
			from: 'mockFrom',
			subject: 'mockSubject',
			text: 'mockText',
			to: 'mockTo',
		} as EmailTemplate;
		await nodeMailerProvider.sendMail(emailOptions);
		expect(mockSendMail).toHaveBeenCalled();
	});

	test('Fail to send email', async () => {
		const nodeMailerProvider = new NodeMailerProvider();
		const emailOptions = {
			from: 'mockFrom',
			subject: 'mockSubject',
			text: 'mockText',
			to: 'mockTo',
		} as EmailTemplate;
		await nodeMailerProvider.sendMail(emailOptions);
		expect(mockSendMail).toThrow();
	});
});

describe('Send email production', () => {
	process.env = {
		ENVIRONMENT: 'production',
		EMAIL: 'mock@email.com',
	};

	test('Successfully send email', async () => {
		const sendGridProvider = new SendGridProvider();
		const emailOptions = {
			from: 'mockFrom',
			subject: 'mockSubject',
			text: 'mockText',
			to: 'mockTo',
		} as EmailTemplate;
		await sendGridProvider.sendMail(emailOptions);
		expect(mockSendMail).toHaveBeenCalled();
	});

	test('Fail send email', async () => {
		const sendGridProvider = new SendGridProvider();

		jest.mock('@sendgrid/mail', () => ({
			...jest.requireActual('@sendgrid/mail'),
			send: jest.fn(async (email) => {
				return Promise.reject();
			}),
		}));

		const emailOptions = {
			subject: 'mockSubject',
			text: 'mockText',
			to: 'mockTo',
		} as EmailTemplate;
		await sendGridProvider.sendMail(emailOptions);
		expect(mockSendMail).toThrow();
	});
});
