import { Config } from '@src/lib/app/Config';
import { Server } from '@src/lib/server/Server';
import { Model } from '@src/lib/app/model/Model';
import { Association } from '@src/lib/app/model/Association';
import { Route } from '@src/lib/app/route/Route';
import { Database } from '@src/lib/app/Database';
import { Documentation } from '@src/lib/swagger/Documentation';

import { MiddlewareFactory } from '@src/lib/server/MiddlewareFactory';

export interface IAppRunOptions {
    models: Model[];
    associations: Association[];
    routes: Route[];
}

export class App {
    private server: Server;
    private database: Database;

    public async run(options: IAppRunOptions): Promise<void> {
        await this.initServer(options.routes);
        if (!this.server || !(this.server instanceof Server)) {
            throw new Error('Server not ready');
        }

        await this.initDatabase(options.models, options.associations);
        if (!this.database || !(this.database instanceof Database)) {
            throw new Error('Database not ready');
        }

        this.server.start();
    }

    private async initServer(routes: Route[]): Promise<void> {
        Server.Init({
            port: Config.HTTP_SERVER_PORT,
            middlewares: [
                MiddlewareFactory.GenerateAuthorizationMiddleware({
                    routeIndex: routes,
                }),
                MiddlewareFactory.GenerateIdentificationMiddleware(),
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
        this.database = Database.GetInstance();
        for (let model of models) {
            model.registerModel(this.database);
        }

        for (let association of associations) {
            association.registerAssociation(this.database);
        }

        await this.database.syncTables();
    }
}
