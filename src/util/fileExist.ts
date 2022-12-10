import fs from 'fs';

export const fileExist = (filePath: string) => {
    return fs.existsSync(filePath);
};
