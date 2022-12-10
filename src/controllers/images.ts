import express from 'express';

import { validationResult } from 'express-validator';
import { makePath } from '../util/constructPath';
import { fileExist } from '../util/fileExist';
import { useSharp } from '../util/resizeImage';

class StatsError extends Error {
    statusCode: number | undefined;
}

export const resizeImage = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): express.Response | void => {
    // validation errors
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const firstError = validationErrors.array({ onlyFirstError: true });

        const error = new StatsError(firstError[0].msg);
        error.statusCode = 403;

        return next(error);
    }

    const filename = req.query.filename as string;
    const width = Number(req.query.width) as number;
    const height = Number(req.query.height) as number;

    // constructing input file path ../../assets/full/${file name(w x h)}
    const inputImagePath: string = makePath(filename, 'full', '.jpg');

    const outputImagePath: string = makePath(`${filename}-${width}-${height}_thumb`, 'thumb', '.jpg');

    if (!fileExist(outputImagePath)) {
        useSharp(inputImagePath, outputImagePath, width, height);
    }

    return res.status(200).sendFile(outputImagePath);
};
