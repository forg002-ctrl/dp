import { Route } from '@src/ext/sdk/backend/app/route/Route';
import { Request, Response } from 'express';
import busboy from 'busboy';

import { routeDescription,
    IRequestParams,
    IResponseBody,
} from '@src/ext/shared/services/fs_srv/routes/file/GetRouteDescription';
import { NotFoundError } from '@src/ext/sdk/backend/errors/types/NotFoundError';

import { MinioClient } from '@src/ext/sdk/backend/storage/minio/MinioClient';

export class GetFileRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let params = req.params as unknown as IRequestParams;
        
        let minioClient = MinioClient.GetInstance();
        let fileStream = await minioClient.getFileStream(params.uid_file);
        if (!fileStream) {
            throw new NotFoundError('File not found');
        }
        
        res.writeHead(200);
        fileStream.pipe(res);
    }
}
