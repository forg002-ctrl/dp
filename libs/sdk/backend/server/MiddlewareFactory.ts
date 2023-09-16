import { NextFunction, Request, Response } from 'express';

import { CreateIdentificationMiddleware, IIdentificationMiddlewareOptions } from './middlewares/IdentificationMiddleware';
import { CreateAuthorizationMiddleware, IAuthorizationMiddlewareOptions } from './middlewares/AuthorizationMiddleware';

export type IMiddlewareInterface = (req: Request, res: Response, next: NextFunction) => void;

export class MiddlewareFactory {
    public static GenerateCorsMiddleware(): IMiddlewareInterface {
        return (req: Request, res: Response, next: NextFunction): void => {
            res.header('Access-Control-Allow-Origin', req.headers.origin || req.headers.path);
            res.header("Access-Control-Allow-Headers", "Content-Type, *");
            res.header('Access-Control-Allow-Methods', 'PUT, PATCH, GET, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Credentials', 'true');

            next();
        };
    }

    public static GenerateIdentificationMiddleware(options: IIdentificationMiddlewareOptions): IMiddlewareInterface {
        return CreateIdentificationMiddleware(options);
    }

    public static GenerateAuthorizationMiddleware(options: IAuthorizationMiddlewareOptions): IMiddlewareInterface {
        return CreateAuthorizationMiddleware(options);
    }
}
