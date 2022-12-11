import express from 'express';
import { resizeImage } from '../../controllers/images';
import { query } from 'express-validator';

const router = express.Router();

router.get(
    '/image',
    // some input validation

    [
        query('filename')
            .not()
            .isEmpty()
            .withMessage('File name can not be empty please enter a file name ')
            .trim()
            .isString()
            .isLength({ min: 2 })
            .withMessage('File name must be a string with at least 2 characteres  '),

        query('width')
            .not()
            .isEmpty()
            .withMessage('Width can not be empty please enter a valid width ')
            .trim()
            .isInt({ min: 1 })
            .withMessage('Width must be a number bigger than 0'),
        query('height', 'Please Enter a valid number as height query parameter')
            .not()
            .isEmpty()
            .withMessage('Width can not be empty please enter a valid width ')
            .trim()
            .isInt({ min: 1 })
            .withMessage('Width must be a number bigger than 0'),
    ],

    resizeImage,
);

export default router;
