import { uuid } from 'uuidv4';
import path from 'path';

export interface IFileSaving {
    saveFile(file: any): string;
}

export class FileSaving implements IFileSaving {
    public saveFile(file: any): string {
        const fileName = uuid() + '.jpg';
        const filePath = path.resolve('../frontend/public', fileName);
        file.mv(filePath);

        return fileName;
    }
}