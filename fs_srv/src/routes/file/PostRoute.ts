import { Request, Response } from 'express';
import { Readable } from 'stream';
import { randomUUID } from 'crypto';
import { ReadStream } from 'fs';

import { Route } from '@src/ext/sdk/backend/app/route/Route';
import { MinioClient } from '@src/ext/sdk/backend/storage/minio/MinioClient';

import { routeDescription,
    IRequestBody,
    IResponseBody,
} from '@src/ext/shared/services/fs_srv/routes/file/PostRouteDescription';

export class PostFileRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let file = req.file;
        if (!file) {
            throw new Error('No file was found');
        }

        console.log(file);
        let uid_file = randomUUID();
        let minioClient = MinioClient.GetInstance();
        await minioClient.writeFile(file, uid_file);
   
        res.status(201).json(<IResponseBody>{ uid_file: uid_file });
    }

    // private async uploadFile(req: Request): Promise<string> {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             let minioClient = MinioClient.GetInstance();
    //             let fileName = randomUUID();

    //             let busboyInstance = busboy({
    //                 headers: req.headers,
    //             });

    //             let fileStream = new Readable();
    //             fileStream._read = (): void => {};
                
    //             busboyInstance.on('file', (name, file, info) => {
    //                 console.log('------ UPLODING OF FILE STARTED ------');

    //                 file.on('data', (data) => {
    //                     fileStream.push(data);
    //                 }).on('end',async () => {
    //                     fileStream.emit('end');
    //                 });

    //                 file.on('limit', () => {
    //                     let error = (`File size limit of 20 MB exceeded`);
    //                     fileStream.emit('error', error);

    //                     reject(error);
    //                 });
    //             });

    //             busboyInstance.on('error', (err: Error) => {
    //                 reject(err);
    //             });

    //             busboyInstance.once('file', async (): Promise<void> => {
    //                 await minioClient.writeFile(fileStream, fileName);
    //                 console.log('------ UPLODING OF FILE ENDED ------');

    //                 resolve(fileName);
    //             });

    //             req.pipe(busboyInstance);
    //         } catch (err) {
    //             reject(err);
    //         }
    //     });
    // }
}
