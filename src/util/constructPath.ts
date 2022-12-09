import path from 'path'

export const makePath = (
    filename: string,
    folderName: string,
    fileExtension: string
): string => {
    return path.join(
        __dirname,
        '..',
        '..',
        'assets',
        folderName,
        filename.replace(/"|'/g, '').concat(fileExtension)
    )
}
