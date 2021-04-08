import ControllerMailer from '@controllers/ControllerMailer';
import { NextFunction, Request, Response } from 'express';
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
	test("Test if send emails is success", () => {
        const controller = new ControllerMailer();
        const mReq = {} as Request;
        mReq.body = {
            reportName: "mockName",
            category: "mockCategory",
            location: "mockLocation"
        }

        jest.spyOn(QueueServices.prototype, 'addMailQueue').mockImplementation(() => Promise.resolve(null));
        jest.spyOn(QueueServices.prototype, 'emailQueueProcess').mockImplementation(() => Promise.resolve(null));

        const mResp = mockResponse();
        controller.sendEmail(mReq, mResp, null);
        expect(mResp.sendStatus).toHaveBeenCalledWith(200);
	});

    test("Test if send emails is not a success", async () => {
        const controller = new ControllerMailer();
        const mReq = {} as Request;
        mReq.body = {
            reportName: '',
            category: '',
            location: ''
        };
        const mNext = () => {
            mResp.status(400).json({
                status: 'error',
                message: 'Missing fields reportName, category, location'
            });
        };

        jest.spyOn(QueueServices.prototype, 'addMailQueue').mockImplementation(() => Promise.resolve(null));
        jest.spyOn(QueueServices.prototype, 'emailQueueProcess').mockImplementation(() => Promise.resolve(null));

		const mResp = mockResponse();

        await controller.sendEmail(mReq, mResp, mNext as NextFunction);
        expect(mResp.status).toHaveBeenCalledWith(400);
        expect(mResp.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Missing fields reportName, category, location'
        });
    });
});