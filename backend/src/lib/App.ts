import { Config } from '@src/lib/Config';

import { Server } from '@src/ext/sdk/backend/server/Server';
import { Model } from '@src/ext/sdk/backend/storage/postgresql/model/Model';
import { Association } from '@src/ext/sdk/backend/storage/postgresql/model/Association';
import { Route } from '@src/ext/sdk/backend/app/route/Route';
import { PostgresqlClient } from '@src/ext/sdk/backend/storage/postgresql/PostgresqlClient';
import { Documentation } from '@src/ext/sdk/backend/swagger/Documentation';

import { MiddlewareFactory } from '@src/ext/sdk/backend/server/MiddlewareFactory';

export interface IAppRunOptions {
    models: Model[];
    associations: Association[];
    routes: Route[];
}

export class App {
    private server: Server;

    public async run(options: IAppRunOptions): Promise<void> {
        await this.initServer(options.routes);
        if (!this.server || !(this.server instanceof Server)) {
            throw new Error('Server not ready');
        }
        await this.initDatabase(options.models, options.associations);

        this.server.start();
    }

    private async initServer(routes: Route[]): Promise<void> {
        Server.Init({
            port: Config.HTTP_SERVER_PORT,
            middlewares: [
                MiddlewareFactory.GenerateAuthorizationMiddleware({
                    routeIndex: routes,
                }),
                MiddlewareFactory.GenerateIdentificationMiddleware({
                    access_token_public_key: Config.ACCESS_TOKEN_PUBLIC_KEY,
                    refresh_token_public_key: Config.REFRESH_TOKEN_PUBLIC_KEY,
                }),
            ],
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

    private async initDatabase(models: Model[], associations: Association[]): Promise<void> {
        PostgresqlClient.Init({
            db_name: Config.DB_NAME,
            db_user: Config.DB_USER,
            db_password: Config.DB_PASSWORD,
            db_host: Config.DB_HOST,
        });

        let postgresqlClient = PostgresqlClient.GetInstance();
        if (!postgresqlClient || !(postgresqlClient instanceof PostgresqlClient)) {
            throw new Error('Database not ready');
        }

        for (let model of models) {
            model.registerModel(postgresqlClient);
        }
        for (let association of associations) {
            association.registerAssociation(postgresqlClient);
        }
        await postgresqlClient.syncTables();
    }
}
