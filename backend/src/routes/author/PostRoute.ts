import { Request, Response } from 'express';

import { Route } from '@src/lib/app/route/Route';

import { routeDescription,
    IRequestBody,
    IResponseBody } from '@src/routes/author/PostRouteDescription';

import { AuthorCreation } from '@src/modules/author/AuthorCreation';
import { AuthorRepository } from '@src/modules/author/repository/AuthorRepository';

export class PostAuthorRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let body = req.body as IRequestBody;

        let oAuthorCreation = new AuthorCreation({
            repo: new AuthorRepository(),
        });
        let response = await oAuthorCreation.execute({
            firstname: body.firstname,
            lastname: body.lastname,
            birthdate: body.birthdate,
            info: body.info,
        });

        res.status(201).json(<IResponseBody>response);
    }
}
