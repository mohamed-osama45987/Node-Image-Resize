import express from 'express'
import fs from 'fs'
import sharp from 'sharp'
import { validationResult } from 'express-validator'
import { makePath } from '../util/constructPath'

class StatsError extends Error {
    statusCode: number | undefined
}

export const resizeImage = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): express.Response | void => {
    // validation errors
    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
        const firstError = validationErrors.array({ onlyFirstError: true })

        const error = new StatsError(firstError[0].msg)
        error.statusCode = 403

        return next(error)
    }

    const filename = req.query.filename as string
    const width = Number(req.query.width) as number
    const height = Number(req.query.height) as number

    // constructing input file path ../../assets/full/${file name(w x h)}
    const inputImagePath: string = makePath(filename, 'full', '.jpg')

    const outputImagePath: string = makePath(
        `${filename}( ${width} x ${height} )_thumb`,
        'thumb',
        '.jpg'
    )

    const fullImage = fs.createReadStream(inputImagePath)

    fullImage.on('open', async () => {
        //  resize the image if you can find original full image and save it
        await sharp(inputImagePath)
            .resize({
                width,
                height,
            })
            .toFile(outputImagePath)

        res.status(200).sendFile(outputImagePath)
        return outputImagePath
    })

    fullImage.on('error', () => {
        const error = new StatsError(
            'Please put an image inside the assets/full folder to be processed '
        )

        error.statusCode = 404
        next(error)
        return error
    })
}
