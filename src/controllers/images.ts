import express from 'express'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { validationResult } from 'express-validator'

const resizeImage = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    // validation errors
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const error = {
            message: 'validation errors',
            err: errors,
            errorCode: 500,
        }

        return next(error)
    }

    const filename: string = req.query.filename as string
    const width: number = Number(req.query.width) as number
    const height: number = Number(req.query.height) as number

    // constructing input file path ../../assets/full/${file name}
    const inputImagePath: string = path.join(
        __dirname,
        '..',
        '..',
        'assets',
        'full',
        filename + '.jpg'
    )

    const outputImagePath: string = path.join(
        __dirname,
        '..',
        '..',
        'assets',
        'thumb',
        filename + '_thumb' + '.jpg'
    )

    // try to find if a pic is already a thumb size

    const thumbImage = fs.createReadStream(outputImagePath)

    thumbImage.on('open', () => {
        console.log('imageFound')

        return res.status(200).sendFile(outputImagePath)
    })

    thumbImage.on('error', (err: NodeJS.ErrnoException) => {
        if (err.code !== 'ENOENT') {
            const error = {
                message: 'Something went wrong ',
                err,
                errorCode: 500,
            }

            return next(error)
        }

        const fullImage = fs.createReadStream(inputImagePath)

        fullImage.on('open', async () => {
            //  resize the image if you can find original full image and save it
            await sharp(inputImagePath)
                .resize({
                    width,
                    height,
                })
                .toFile(outputImagePath)

            console.log('Image resized')
            return res.status(200).sendFile(outputImagePath)
        })

        fullImage.on('error', (err: NodeJS.ErrnoException) => {
            const error = {
                message: 'Please put an image inside the assets/full folder',
                code: 404,
                err,
            }

            return next(error)
        })
    })
}

export default {
    resizeImage,
}
