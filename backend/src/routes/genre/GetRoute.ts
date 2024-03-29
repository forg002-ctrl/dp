import { Route } from '@src/ext/sdk/backend/app/route/Route';
import { Request, Response } from 'express';

import {
    routeDescription,
    IRequestParams,
    IResponseBody,
} from '@src/ext/shared/services/backend/routes//genre/GetRouteDescription';

import { GenreGetting } from '@src/modules/genre/GenreGetting';
import { GenreRepository } from '@src/modules/genre/repository/GenreRepository';

export class GetGenreRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let params = req.params as unknown as IRequestParams;

        let oGenreGetting = new GenreGetting({
            repo: new GenreRepository(),
        });
        let response = await oGenreGetting.execute({
            id_genre: params.id_genre,
        });

        res.status(200).json(<IResponseBody>response);
    }
}
