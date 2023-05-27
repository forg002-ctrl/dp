import { NextFunction, Request, Response } from 'express';

import { CreateIdentificationMiddleware, IIdentificationMiddlewareOptions } from './middlewares/IdentificationMiddleware';
import { CreateAuthorizationMiddleware, IAuthorizationMiddlewareOptions } from './middlewares/AuthorizationMiddleware';

export type IMiddlewareInterface = (req: Request, res: Response, next: NextFunction) => void;

export class MiddlewareFactory {
    public static GenerateIdentificationMiddleware(): IMiddlewareInterface {
        return CreateIdentificationMiddleware();
    }

    public static GenerateAuthorizationMiddleware(options: IAuthorizationMiddlewareOptions): IMiddlewareInterface {
        return CreateAuthorizationMiddleware(options);
    }
}
