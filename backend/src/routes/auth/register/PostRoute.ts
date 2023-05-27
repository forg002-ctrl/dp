import { Request, Response } from 'express';

import { Route } from '@src/lib/app/route/Route';

import {
    routeDescription,
    IRequestBody,
    IResponseBody,
} from '@src/routes/auth/register/PostRouteDescription';

import { UserRepository } from '@src/modules/user/repository/UserRepository';
import { SigningUp } from '@src/modules/auth/SigningUp';
import { UserCheckingByUsername } from '@src/modules/user/UserCheckingByUsername';
import { UserCheckingByEmail } from '@src/modules/user/UserCheckingByEmail';

export class PostUserRegisterRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let body = req.body as IRequestBody;

        let userRepo = new UserRepository();
        let userSigningUp = new SigningUp({
            repo: userRepo,
            userCheckingByUsername: new UserCheckingByUsername({
                repo: userRepo,
            }),
            userCheckingByEmail: new UserCheckingByEmail({
                repo: userRepo,
            }),
        });

        let response = await userSigningUp.execute({
            username: body.username,
            email: body.email,
            password: body.password,
        });

        res.status(201).json(<IResponseBody>response);
    }
}
