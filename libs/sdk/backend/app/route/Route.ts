import moment from 'moment';
import multer from 'multer';
import { Response, Request, Router, NextFunction } from 'express';

import { ErrorHandler } from '../../errors/ErorrHandler';

import { Server } from '../../server/Server';

import { IRouteDescription } from './description/interfaces/IRouteDescription';

export interface IRouteOptions {
    description: IRouteDescription;
}

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export abstract class Route {
    private description: IRouteDescription;

    public constructor(options: IRouteOptions) {
        this.description = options.description;
    }

    public async register(server: Server): Promise<void> {
        let router: Router = server.getRouter();

        switch (this.description.httpMethod) {
            case 'POST': {
                if (this.description.upload) {
                    router.post(this.description.endpoint, upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
                        await this.execute(req, res);
                    });
                } else {
                    router.post(this.description.endpoint, async (req: Request, res: Response, next: NextFunction) => {
                        await this.execute(req, res);
                    });
                }
                break;
            }
            case 'GET': {
                router.get(this.description.endpoint, async (req: Request, res: Response, next: NextFunction) => {
                    await this.execute(req, res);
                });
                break;
            }
            case 'PUT': {
                router.put(this.description.endpoint, async (req: Request, res: Response, next: NextFunction) => {
                    await this.execute(req, res);
                });
                break;
            }
            case 'DELETE': {
                router.delete(this.description.endpoint, async (req: Request, res: Response, next: NextFunction) => {
                    await this.execute(req, res);
                });
                break;
            }
            default: {
                throw new Error(`ERROR: Non-handled route method - ${this.description.httpMethod}`);
            }
        }

        let documentation = server.getSwaggerDocumentation();
        if (documentation) {
            documentation.addEnpoint(this.description.endpoint, this.getSwaggerDescription());
        }
    }

    public async execute(req: Request, res: Response): Promise<void> {
        try {
            await this.main(req, res);
        } catch (err) {
            let errorHandler = ErrorHandler.GetInstance();

            if (errorHandler.isAuthError(err)) {
                res.status(401);
                res.json({ error: err.message });
            } else if (errorHandler.isUserInputError(err)) {
                res.status(400);
                res.json({ error: err.message });
            } else if (errorHandler.isNotFoundError(err)) {
                res.status(404);
                res.json({ error: err.message });
            } else {
                console.log(err);
                res.status(500);
                res.json({ error: 'Internal Server Error' });
            }
        } finally {
            console.log('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][' + this.description.httpMethod + '][' + this.constructor.name + ']', res.statusCode, res.statusMessage);
        }
    }

    public abstract main(req: Request, res: Response): Promise<void>;

    public getSwaggerDescription(): Record<string, unknown> {
        return { [this.description.httpMethod.toLowerCase()]: this.description.definition };
    }

    public getRouteDescription(): IRouteDescription {
        return this.description;
    }

    public getEndpoint(): string {
        return this.description.endpoint;
    }

    public getHttpMethod(): string {
        return this.description.httpMethod;
    }
}
