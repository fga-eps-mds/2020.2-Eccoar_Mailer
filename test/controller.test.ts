import ControllerMailer from '@controllers/ControllerMailer';
import { Request, Response } from 'express';
import QueueServices from '@services/QueueServices';

const mockResponse = () => {
	const res: Response = {} as Response;
	res.status = jest.fn().mockReturnValue(res);
	res.sendStatus = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};

describe('pong', () => {
	test('should return ping-pong for pong()', () => {
		const controller = new ControllerMailer();
		const mReq = {} as Request;
		const mResp = mockResponse();
		controller.pong(mReq, mResp);
		expect(mResp.status).toHaveBeenCalledWith(200);
		expect(mResp.json).toHaveBeenCalledWith({ ping: 'pong' });
	});
});

describe('Test Send Email Controller', () => {
	test('Test if send emails is success', () => {
		const controller = new ControllerMailer();
		const mReq = {} as Request;
		mReq.query = {
			email: 'eccoar_teste@eccoar.com',
			subject: 'Teste Email Eccoar',
			text: 'Assunto de Email Eccoar',
		};

		jest.spyOn(
			QueueServices.prototype,
			'addMailQueue',
		).mockImplementation();
		jest.spyOn(
			QueueServices.prototype,
			'emailQueueProcess',
		).mockImplementation();

		const mResp = mockResponse();
		controller.sendEmail(mReq, mResp);
		expect(mResp.sendStatus).toHaveBeenCalledWith(200);
	});

	test('Test if send emails is not a success', () => {
		const controller = new ControllerMailer();
		const mReq = {} as Request;
		mReq.query = {
			toEmail: 'eccoar_teste@eccoar.com',
			title: 'Teste Email Eccoar',
			text: 'Assunto de Email Eccoar',
		};

		const mResp = mockResponse();
		controller.sendEmail(mReq, mResp);
		expect(mResp.status).toHaveBeenCalledWith(400);
		expect(mResp.json).toHaveBeenCalledWith({
			error: 'error to get email values',
		});
	});
});
