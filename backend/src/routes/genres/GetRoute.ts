import { Route } from '@src/ext/sdk/backend/app/route/Route';
import { Request, Response } from 'express';

import {
    routeDescription,
    IResponseBody,
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
        let oGenresListing = new GenresListing({
            repo: new GenreRepository(),
        });
        let response = await oGenresListing.execute();

        res.status(200).json(<IResponseBody>response);
    }
}
