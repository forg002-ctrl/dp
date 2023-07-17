import { Config } from '@src/lib/Config';

import { Server } from '@src/ext/sdk/backend/server/Server';
import { Route } from '@src/ext/sdk/backend/app/route/Route';
import { Documentation } from '@src/ext/sdk/backend/swagger/Documentation';

export interface IAppRunOptions {
    routes: Route[];
}

export class App {
    private server: Server;
    // private database: Database;

    public async run(options: IAppRunOptions): Promise<void> {
        await this.initServer(options.routes);
        if (!this.server || !(this.server instanceof Server)) {
            throw new Error('Server not ready');
        }

        // await this.initDatabase(options.models, options.associations);
        // if (!this.database || !(this.database instanceof Database)) {
        //     throw new Error('Database not ready');
        // }

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

    // private async initDatabase(models: Model[], associations: Association[]): Promise<void> {
    //     Database.Init({
    //         db_name: Config.DB_NAME,
    //         db_user: Config.DB_USER,
    //         db_password: Config.DB_PASSWORD,
    //         db_host: Config.DB_HOST,
    //     });
    //     this.database = Database.GetInstance();
    //     for (let model of models) {
    //         model.registerModel(this.database);
    //     }

    //     for (let association of associations) {
    //         association.registerAssociation(this.database);
    //     }

    //     await this.database.syncTables();
    // }
}
