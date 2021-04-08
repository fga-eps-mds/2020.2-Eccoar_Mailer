import { BadRequest, NotFound } from "../src/utils/errors";

describe('Error handling', () => {
    test('Return BadRequest', () => {
        const error = new BadRequest('error');
        expect(error.message).toBe('error');
        expect(error.getCode()).toBe(400);
    });

    test('Return NotFound', () => {
        const error = new NotFound('error');
        expect(error.message).toBe('error');
        expect(error.getCode()).toBe(404);
    });
});
