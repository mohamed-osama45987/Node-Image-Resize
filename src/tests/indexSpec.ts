import app from '../index'
import request from 'supertest'

describe('Error handler tests', () => {
    it('Should return status code 200 for index of the project ', async () => {
        const response = await request(app).get('/')
        expect(response.status).toEqual(200)
        expect(response.body).toBe(
            'Hello from the index route of the project Here we will build our front end landing page Later'
        )
    })

    it('should return an error code 403 when api/image no prams provided', async () => {
        const response = await request(app).get('/api/image')
        expect(response.body.message).toBe(
            'Please Enter a valid filename as query parameter'
        )
        expect(response.status).toEqual(403)
    })
})




