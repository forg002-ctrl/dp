import { Route } from '@src/ext/sdk/backend/app/route/Route';
import { Request, Response } from 'express';

import {
    routeDescription,
    IResponseBody,
    IListQuery,
} from '@src/ext/shared/services/backend/routes//genres/GetRouteDescription';

import { GenresListing } from '@src/modules/genre/GenresListing';
import { GenreRepository } from '@src/modules/genre/repository/GenreRepository';

export class GetGenresRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let queryParams = req.query as IListQuery;

        let oGenresListing = new GenresListing({
            repo: new GenreRepository(),
        });
        let response = await oGenresListing.execute(queryParams);

        res.status(200).json(<IResponseBody>response);
    }
}
