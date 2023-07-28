require('module-alias/register');
import dotenv from 'dotenv';
dotenv.config();

import { Config } from '@src/lib/Config';
import { App } from '@src/lib/App';

import { appRoutes } from '@src/routes/routeIndex';

global.testMode = typeof process.env.NODE_ENV === 'string' && process.env.NODE_ENV.toLowerCase() === 'test';

void (async (): Promise<void> => {
    Config.Init({
        http_server_port: Number(process.env.HTTP_SERVER_PORT),
        minio_endpoint: process.env.MINIO_ENDPOINT as string,
        minio_port: Number(process.env.MINIO_PORT),
        minio_ssl: process.env.MINIO_SSL === "true",
        minio_access_key: process.env.MINIO_ACCESS_KEY as string,
        minio_secret_key: process.env.MINIO_SECRET_KEY as string,
        bucket_name: process.env.BUCKET_NAME as string,
    });

    let app = new App();
    await app.run({
        routes: appRoutes,
    });
})();
