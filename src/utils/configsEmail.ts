import * as dotenv from 'dotenv';

dotenv.config();

export const configsEmail = {
    service: process.env.SERVICE,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    },
}