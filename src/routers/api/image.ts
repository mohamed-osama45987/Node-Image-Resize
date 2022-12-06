import express from 'express'
import ImageControllers from '../../controllers/images'
import { query } from 'express-validator'

const router = express.Router()

router.get(
    '/image',
    // some input validation

    [
        query('filename', 'Please Enter a valid filename ')
            .not()
            .isEmpty()
            .trim()
            .isString()
            .isLength({ min: 2 }),
        query('width', 'Please Enter a valid width').isFloat(),
        query('height', 'Please Enter a file height').isFloat(),
    ],

    ImageControllers.resizeImage
)

export default router
