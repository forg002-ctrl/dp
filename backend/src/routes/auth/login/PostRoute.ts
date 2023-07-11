import { Request, Response } from 'express';

import { Route } from '@src/lib/app/route/Route';

import {
    routeDescription,
    IRequestBody,
    IResponseBody,
} from '@src/ext/shared/routes/auth/login/PostRouteDescription';

import { SigningIn } from '@src/modules/auth/SigningIn';
import { UserGettingByUsername } from '@src/modules/user/UserGettingByUsername';
import { UserRepository } from '@src/modules/user/repository/UserRepository';

import { AccessTokenSigning } from '@src/modules/token/AccessTokenSigning';
import { RefreshTokenSigning } from '@src/modules/token/RefreshTokenSigning';

import { SessionCreation } from '@src/modules/session/SessionCreation';
import { SessionRepository } from '@src/modules/session/repository/SessionRepository';

export class PostUserLoginRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let body = req.body as IRequestBody;

        let userSigningIn = new SigningIn({
            userGettingByUsername: new UserGettingByUsername({
                repo: new UserRepository(),
            }),
            accessTokenSigning: new AccessTokenSigning(),
            refreshTokenSigning: new RefreshTokenSigning({
                sessionCreation: new SessionCreation({
                    repo: new SessionRepository(),
                }),
            }),
        });

        let response = await userSigningIn.execute({
            username: body.username,
            password: body.password,
        });

        res.cookie('x-refresh-token', response.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            sameSite: 'strict',
            httpOnly: true,
            secure: true,
        });

        res.status(201).json(<IResponseBody>{
            user: response.user,
            accessToken: response.accessToken,
        });
    }
}
