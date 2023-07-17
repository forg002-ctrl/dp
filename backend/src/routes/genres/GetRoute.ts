import { Route } from '@src/ext/sdk/backend/app/route/Route';
import { Request, Response } from 'express';

import {
    routeDescription,
    IResponseBody,
} from '@src/ext/shared/services/backend/routes//genres/GetRouteDescription';

import { GenreListing } from '@src/modules/genre/GenreListing';
import { GenreRepository } from '@src/modules/genre/repository/GenreRepository';

export class GetGenresRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let oGenreListing = new GenreListing({
            repo: new GenreRepository(),
        });
        let response = await oGenreListing.execute();

        res.status(200).json(<IResponseBody>response);
    }
}
