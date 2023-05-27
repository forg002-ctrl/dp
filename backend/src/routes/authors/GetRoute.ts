import { Route } from '@src/lib/app/route/Route';
import { Request, Response } from 'express';

import {
    routeDescription,
    IResponseBody,
} from '@src/routes/authors/GetRouteDescription';
import { AuthorListing } from '@src/modules/author/AuthorListing';
import { AuthorRepository } from '@src/modules/author/repository/AuthorRepository';

export class GetAuthorsRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let oAuthorListing = new AuthorListing({
            repo: new AuthorRepository(),
        });
        let response = await oAuthorListing.execute();

        res.status(200).json(<IResponseBody>response);
    }
}
