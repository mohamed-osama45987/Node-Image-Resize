import express from 'express';
import { resizeImage } from '../../controllers/images';
import { query } from 'express-validator';

const router = express.Router();

router.get(
    '/image',
    // some input validation

    [
        query('filename', 'Please Enter a valid filename as query parameter')
            .not()
            .isEmpty()
            .trim()
            .isString()
            .isLength({ min: 2 }),
        query('width', 'Please Enter a valid number as width query parameter').isFloat(),
        query('height', 'Please Enter a valid number as height query parameter').isFloat(),
    ],

    resizeImage,
);

export default router;
