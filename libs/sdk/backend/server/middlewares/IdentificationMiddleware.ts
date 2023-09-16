import { NextFunction, Request, Response } from 'express';
import { IMiddlewareInterface } from '../MiddlewareFactory';

import { JwtService } from '../../utils/JwtService';

import { AuthError } from '../../errors/types/AuthError';

export interface IJwtTokenPayload {
    id_user: number;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CustomRequest extends Request {
    appUser: IJwtTokenPayload;
}

let _tokens: IIdentificationMiddlewareOptions = {
    access_token_public_key: '',
    refresh_token_public_key: '',
};

const IdentificationMiddleware: IMiddlewareInterface = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    if (req.method === 'OPTIONS' || req.path.match(/^\/swagger.*/gi) || req.path ==='/token/refresh') {
        return next();
    }

    try {
        let accessToken = req.headers.authorization
            ? req.headers.authorization.split(' ')[1]
            : '';

        if (accessToken) {
            let decodedData = JwtService.GetInstance().verifyJwt(accessToken, 'ACCESS_TOKEN_PUBLIC_KEY', _tokens.access_token_public_key, _tokens.refresh_token_public_key) as unknown as IJwtTokenPayload;
            if (!decodedData) {
                res.status(401);
                res.json({ error: 'Unauthorized' });
            }
            req.appUser = decodedData;
        }

        return next();
    } catch (err) {
        res.status(401);
        res.json({ error: 'Unauthorized' });
    }
};

export interface IIdentificationMiddlewareOptions {
    access_token_public_key: string;
    refresh_token_public_key: string;
}

export const CreateIdentificationMiddleware = (options: IIdentificationMiddlewareOptions): IMiddlewareInterface => {
    _tokens = options;

    return IdentificationMiddleware;
};
