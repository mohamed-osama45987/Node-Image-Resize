import express, { query } from 'express';

import { validationResult } from 'express-validator';
import { makePath } from '../util/constructPath';
import { fileExist } from '../util/fileExist';
import { useSharp } from '../util/resizeImage';

class StatsError extends Error {
    statusCode: number | undefined;
}

export const resizeImage = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): Promise<string> => {
    // validation errors handeling
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const firstError = validationErrors.array({ onlyFirstError: true });

        const error = new StatsError(firstError[0].msg);
        error.statusCode = 403;
        next(error);
        return 'Validation Error';
    }

    const filename = req.query.filename as string;

    const width = Number(req.query.width) as number;
    const height = Number(req.query.height) as number;

    // constructing input file path ../../assets/full/${file name(w x h)}
    const inputImagePath: string = makePath(filename, 'full');

    const outputImagePath: string = makePath(`${filename}-${width}-${height}_thumb`, 'thumb');

    if (!fileExist(inputImagePath)) {
        const error = new StatsError('Invalid original file name make sure you enter a correct file name');
        error.statusCode = 404;
        next(error);
        return 'File does not exist in the assets/full folder ';
    }

    if (!fileExist(outputImagePath)) {
        await useSharp(inputImagePath, outputImagePath, width, height);
    }
    res.status(200).sendFile(outputImagePath);
    return outputImagePath;
};
