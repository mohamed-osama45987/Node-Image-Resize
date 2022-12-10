import fs from 'fs';

export const fileExist = (filePath: string): boolean => {
    return fs.existsSync(filePath);
};
