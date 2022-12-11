import app from '../index';
import request from 'supertest';

describe('Image Controller Tests', () => {
    it('Should throw validation Errors if no paramters provided', async () => {
        const response = await request(app).get('/api/image');

        expect(response.statusCode).toEqual(403);

        expect(response.body).toEqual({
            message: 'File name can not be empty please enter a file name',
            statusCode: 403,
        });
    });

    it('Should throw validation Errors if wrong paramters provided', async () => {
        const response = await request(app).get('/api/image?filename="fjord"&width="WRONG"&height=200');

        expect(response.statusCode).toEqual(403);

        expect(response.body).toEqual({
            message: 'Width must be a number bigger than 0',
            statusCode: 403,
        });
    });

    it('Should return a proccessed image if the correct api end point is used', async () => {
        const response = await request(app).get('/api/image?filename="fjord"&width=200&height=200');

        expect(response.statusCode).toEqual(200);

        expect(response.body).toBeTruthy();
    });
});
