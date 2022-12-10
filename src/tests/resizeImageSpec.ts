import { useSharp } from '../util/resizeImage';
import { makePath } from '../util/constructPath';
import { fileExist } from '../util/fileExist';
import { unlinkSync } from 'fs';

describe('Test for image processing', () => {
    const inputImagePath = makePath('example', 'full');
    const outputImagePath = makePath('example-200-200_thumb', 'thumb');

    beforeAll(async (): Promise<string> => {
        //  generating an example image
        const generatedImage = await useSharp(inputImagePath, outputImagePath, 200, 200);
        return generatedImage;
    });

    it('Should able to read the generated file', () => {
        const file = fileExist(outputImagePath);
        expect(file).toBe(true);
    });

    afterAll((): void => {
        //  generating an example image
        return unlinkSync(outputImagePath);
    });
});
