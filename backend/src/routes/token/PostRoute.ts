import { Request, Response } from 'express';

import { Route } from '@src/ext/sdk/backend/app/route/Route';

import { routeDescription,
    IResponseBody } from '@src/ext/shared/services/backend/routes//token/PostRouteDescription';

import { UserGetting } from '@src/modules/user/UserGetting';
import { UserRepository } from '@src/modules/user/repository/UserRepository';

import { AccessTokenSigning } from '@src/modules/token/AccessTokenSigning';
import { AccessTokenRefreshing } from '@src/modules/token/AccessTokenRefreshing';

import { SessionGetting } from '@src/modules/session/SessionGetting';
import { SessionRepository } from '@src/modules/session/repository/SessionRepository';

export class PostAccessTokenRefreshRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let refreshToken = req.cookies['x-refresh-token'];

        let accessTokenRefreshing = new AccessTokenRefreshing({
            sessionGetting: new SessionGetting({
                repo: new SessionRepository(),
            }),
            userGetting: new UserGetting({
                repo: new UserRepository(),
            }),
            accessTokenSigning: new AccessTokenSigning(),
        });

        let response = await accessTokenRefreshing.execute({
            refreshToken: refreshToken,
        });

        res.status(201).json(<IResponseBody>{
            accessToken: response.accessToken,
        });
    }
}
