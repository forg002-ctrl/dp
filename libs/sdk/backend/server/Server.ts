import express, { Express, Router, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { Documentation } from '../swagger/Documentation';

import { IMiddlewareInterface } from '../server/MiddlewareFactory';

export interface IServerOptions {
    port: number;
    middlewares: IMiddlewareInterface[];
    swaggerDocumention: Documentation;
}

export class Server {
    private static instance: Server;

    private app: Express;
    private router?: Router;
    private port: number;
    private swaggerDocumention: Documentation;

    private constructor(options: IServerOptions) {
        this.port = options.port;
        this.swaggerDocumention = options.swaggerDocumention;
        this.app = express();
        this.app.use(cors());
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        // TODO: Remove for make authorization work
        // for (let middleware of options.middlewares) {
        //     this.app.use('/', middleware);
        // }
    }

    public static Init(options: IServerOptions): void {
        if (this.instance) {
            throw new Error('Server is already initialized');
        }

        this.instance = new Server(options);
    }

    public static GetInstance(): Server {
        if (!this.instance) {
            throw new Error('Not initialized');
        }

        return this.instance;
    }

    public start(): void {
        if (!this.port || this.port <= 0) {
            console.log('Wrong port value');

            return;
        }

        this.initDocumentation();

        this.app.listen(this.port, () => {
            console.log(`Server is running on port - ${this.port}`);
        });
    }

    public getRouter(): Router {
        if (!this.router) {
            this.router = Router();
            this.app.use(this.router);
        }

        return this.router;
    }

    public getSwaggerDocumentation(): Documentation | undefined {
        return this.swaggerDocumention;
    }

    private initDocumentation(): void {
        if (!this.swaggerDocumention) {
            return;
        }

        let swaggerDocs = this.swaggerDocumention.getSwaggerJsDoc();
        let swaggerDocsHtml = swaggerUi.generateHTML(swaggerDocs);

        this.getRouter().use('/swagger', swaggerUi.serveFiles(swaggerDocs));
        this.getRouter().get('/swagger', (req: Request, res: Response): void => {
            res.send(swaggerDocsHtml);
        });
    }

    public getExpressApp(): Express {
        return this.app;
    }
}
