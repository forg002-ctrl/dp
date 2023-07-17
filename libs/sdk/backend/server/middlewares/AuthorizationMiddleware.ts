import { NextFunction, Request, Response } from 'express';

import { Server } from '../Server';
import { Route } from '../../app/route/Route';
import { IMiddlewareInterface } from '../MiddlewareFactory';

import { ErrorHandler } from '../../errors/ErorrHandler';
import { AuthError } from '../../errors/types/AuthError';
import { NotFoundError } from '../../errors/types/NotFoundError';

import { IAppUser } from '../../app/interfaces/IAppUser';

export interface ICustomRequest extends Request {
    appUser: IAppUser;
}

let _routeIndex: Route[] = [];
const getRoute = (route: string, method: string): Route | undefined => {
    let router = Server.GetInstance().getRouter();

    let layer = router.stack.find(r => r.regexp && route.match(r.regexp) && (r.route ? r.route.methods[method.toLowerCase()] : true));
    if (!layer || !layer.route) {
        return;
    }

    return _routeIndex.find(r => r.getEndpoint() === layer.route.path && r.getHttpMethod() === method);
};

const AuthorizationMiddleware: IMiddlewareInterface = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
    
            return;
        }

        if (req.path.match(/^\/swagger.*/gi)) {
            return next();
        }

        let route = getRoute(`${req.baseUrl}${req.path}`, req.method);
        if (!route) {
            throw new NotFoundError();
        }

        let routeDescription = route.getRouteDescription();
        if (!routeDescription) {
            throw new Error(`Route "${req.baseUrl}${req.path}" has not description`);
        }

        if (!routeDescription.authRequired) {
            return next();
        }

        let accessToken = req.headers.authorization
            ? req.headers.authorization.split(' ')[1]
            : '';

        if (!accessToken) {
            throw new AuthError();
        }

        return next();
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
    }
};

export interface IAuthorizationMiddlewareOptions {
    routeIndex: Route[];
}

export const CreateAuthorizationMiddleware = (options: IAuthorizationMiddlewareOptions): IMiddlewareInterface => {
    _routeIndex = options.routeIndex;

    return AuthorizationMiddleware;
};
