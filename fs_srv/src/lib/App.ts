import { Config } from '@src/lib/Config';

import { Server } from '@src/ext/sdk/backend/server/Server';
import { MinioClient } from '@src/ext/sdk/backend/storage/minio/MinioClient';
import { Route } from '@src/ext/sdk/backend/app/route/Route';
import { Documentation } from '@src/ext/sdk/backend/swagger/Documentation';

export interface IAppRunOptions {
    routes: Route[];
}

export class App {
    private server: Server;

    public async run(options: IAppRunOptions): Promise<void> {
        await this.initServer(options.routes);
        if (!this.server || !(this.server instanceof Server)) {
            throw new Error('Server not ready');
        }
        await this.initFileStorage();

        this.server.start();
    }

    private async initServer(routes: Route[]): Promise<void> {
        Server.Init({
            port: Config.HTTP_SERVER_PORT,
            middlewares: [],
            swaggerDocumention: new Documentation({
                basepath: '/',
                information: {
                    title: 'REST API',
                    description: 'REST API Routes',
                    version: '0.0.1',
                },
            }),
        });

        this.server = Server.GetInstance();
        for (let route of routes) {
            await route.register(this.server);
        }
    }

    private async initFileStorage(): Promise<void> {
        await MinioClient.Init({
            minio_endpoint: Config.MINIO_ENDPOINT,
            minio_port: Config.MINIO_PORT,
            minio_SSL: Config.MINIO_SSL,
            minio_access_key: Config.MINIO_ACCESS_KEY,
            minio_secret_key: Config.MINIO_SECRET_KEY,
            bucket_name: Config.BUCKET_NAME,
        });

        let minioClient = MinioClient.GetInstance();
        if (!minioClient || !(minioClient instanceof MinioClient)) {
            throw new Error('File Storage not ready');
        }
    }
}
