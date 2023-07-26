import { Route } from '@src/ext/sdk/backend/app/route/Route';
import { Request, Response } from 'express';

import { routeDescription,
    IRequestParams,
    IResponseBody,
} from '@src/ext/shared/services/fs_srv/routes/file/DeleteRouteDescription';

import { MinioClient } from '@src/ext/sdk/backend/storage/minio/MinioClient';

export class DeleteFileRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let params = req.params as unknown as IRequestParams;
        
        let minioClient = MinioClient.GetInstance();
        await minioClient.removeFile(params.uid_file);
        
        res.status(200).json(<IResponseBody>{ success: true });
    }
}
