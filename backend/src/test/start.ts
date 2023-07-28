require('module-alias/register');
import dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../../../.env` });

import supertest from 'supertest';

import { App } from '@src/lib/App';
import { Config } from '@src/lib/Config';

import { appModels } from '@src/db/modelIndex';
import { appAssociations } from '@src/db/associationsIndex';
import { appRoutes } from '@src/routes/routeIndex';

let request: supertest.SuperTest<supertest.Test>;
let app: App;

const start = async (): Promise<supertest.SuperTest<supertest.Test>> => {
    global.testMode = true;
    console.log(__dirname);
    if (!app) {
        Config.Init({
            http_server_port: 0,
            db_user: process.env.DB_USER as string,
            db_password: process.env.DB_PASSWORD as string,
            db_name: process.env.DB_TEST_NAME as string,
            db_host: '127.0.0.1',
            db_port: Number(process.env.DB_TEST_PORT),
            access_token_public_key: '',
            access_token_private_key: '',
            refresh_token_public_key: '',
            refresh_token_private_key: '',
        });

        let _app = new App();
        await _app.run({
            routes: appRoutes,
            models: appModels,
            associations: appAssociations,
        });

        app = _app;
    }

    request = request || supertest(app.getExpressApp());

    return request;
};

export { start, request, app };
