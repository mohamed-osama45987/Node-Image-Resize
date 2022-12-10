import sharp from 'sharp';
export const useSharp = async (
    inputImagePath: string,
    outputImagePath: string,
    width: number,
    height: number,
): Promise<string> => {
    await sharp(inputImagePath)
        .resize({
            width,
            height,
        })
        .toFile(outputImagePath);

    return outputImagePath;
};
