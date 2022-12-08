import app from '../index'
import { resizeImage } from '../controllers/images'
import request from 'supertest'

describe('Resize image tests ( functionality tests )', () => {
    it('Should return an error if file name parameter is missing from the url', async () => {
        const request = {
            query: {
                filename: '',
            },
        }

       
    })
})
