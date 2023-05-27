import { Route } from '@src/lib/app/route/Route';
import { Request, Response } from 'express';

import {
    routeDescription,
    IRequestParams,
    IResponseBody,
} from '@src/routes/author/GetRouteDescription';
import { AuthorGetting } from '@src/modules/author/AuthorGetting';
import { AuthorRepository } from '@src/modules/author/repository/AuthorRepository';

export class GetAuthorRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let params = req.params as unknown as IRequestParams;

        let oAuthorGetting = new AuthorGetting({
            repo: new AuthorRepository(),
        });
        let response = await oAuthorGetting.execute({
            id_author: params.id_author,
        });

        res.status(200).json(<IResponseBody>response);
    }
}
