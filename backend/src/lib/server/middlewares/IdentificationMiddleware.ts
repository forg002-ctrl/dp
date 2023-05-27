import { NextFunction, Request, Response } from 'express';
import { IMiddlewareInterface } from './../MiddlewareFactory';

import { JwtService } from '@src/lib/utils/JwtService';

import { AuthError } from '@src/lib/errors/types/AuthError';

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


const IdentificationMiddleware: IMiddlewareInterface = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    if (req.method === 'OPTIONS' || req.path.match(/^\/swagger.*/gi)) {
        return next();
    }

    try {
        let accessToken = req.headers.authorization
            ? req.headers.authorization.split(' ')[1]
            : '';

        if (accessToken) {
            let decodedData = JwtService.GetInstance().verifyJwt(accessToken, 'ACCESS_TOKEN_PUBLIC_KEY') as unknown as IJwtTokenPayload;
            if (!decodedData) {
                throw new AuthError();
            }
            req.appUser = decodedData;
        }
        return next();
    } catch (err) {
        throw new AuthError();
    }
};

export interface IIdentificationMiddlewareOptions {
    serviceKey: string;
}

export const CreateIdentificationMiddleware = (): IMiddlewareInterface => {
    return IdentificationMiddleware;
};
