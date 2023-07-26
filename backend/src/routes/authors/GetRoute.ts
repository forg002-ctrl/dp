import { Route } from '@src/ext/sdk/backend/app/route/Route';
import { Request, Response } from 'express';

import {
    routeDescription,
    IResponseBody,
} from '@src/ext/shared/services/backend/routes//authors/GetRouteDescription';

import { AuthorsListing } from '@src/modules/author/AuthorsListing';
import { AuthorRepository } from '@src/modules/author/repository/AuthorRepository';

export class GetAuthorsRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let oAuthorsListing = new AuthorsListing({
            repo: new AuthorRepository(),
        });
        let response = await oAuthorsListing.execute();

        res.status(200).json(<IResponseBody>response);
    }
}
