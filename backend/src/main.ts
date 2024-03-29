require('module-alias/register');
import dotenv from 'dotenv';
dotenv.config();

import { Config } from '@src/lib/Config';
import { SDK } from '@src/ext/sdk/backend/index';
import { App } from '@src/lib/App';

import { appModels } from '@src/db/modelIndex';
import { appAssociations } from '@src/db/associationsIndex';
import { appRoutes } from '@src/routes/routeIndex';

void (async (): Promise<void> => {
    Config.Init({
        http_server_port: Number(process.env.HTTP_SERVER_PORT),
        db_user: process.env.DB_USER as string,
        db_password: process.env.DB_PASSWORD as string,
        db_name: process.env.DB_NAME as string,
        db_host: process.env.DB_HOST as string,
        db_port: Number(process.env.DB_PORT),
        access_token_public_key: process.env.ACCESS_TOKEN_PUBLIC_KEY as string,
        access_token_private_key: process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
        refresh_token_public_key: process.env.REFRESH_TOKEN_PUBLIC_KEY as string,
        refresh_token_private_key: process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
    });

    SDK.Init({
        serviceName: 'backend',
    });

    let app = new App();
    await app.run({
        routes: appRoutes,
        models: appModels,
        associations: appAssociations,
    });
})();
