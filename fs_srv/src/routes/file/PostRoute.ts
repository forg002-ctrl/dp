import { Request, Response } from 'express';
import { randomUUID } from 'crypto';

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

        let uid_file = randomUUID();
        let minioClient = MinioClient.GetInstance();
        await minioClient.writeFile(file, uid_file);
   
        res.status(201).json(<IResponseBody>{ uid_file: uid_file });
    }
}
