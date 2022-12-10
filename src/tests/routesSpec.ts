import app from '../index';
import request from 'supertest';

describe('Api responses test', () => {
    it('Should return status code 200 for index of the project ', async () => {
        const response = await request(app).get('/');
        expect(response.status).toEqual(200);
    });

    it('should return an error code 403 when api/image no prams provided', async () => {
        const response = await request(app).get('/api/image');
        expect(response.body.message).toBe('Please Enter a valid filename as query parameter');
        expect(response.status).toEqual(403);
    });

    it('should return an error code 404 when accessing any unavailable route', async () => {
        const response = await request(app).get('/unavailable');

        expect(response.status).toEqual(404);

        expect(response.text).toMatch(`<h1>Page not found</h1>`);
    });
});
