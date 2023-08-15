import { Request, Response } from 'express';

import { Route } from '@src/ext/sdk/backend/app/route/Route';

import { routeDescription,
    IRequestBody,
    IResponseBody } from '@src/ext/shared/services/backend/routes//genre/PostRouteDescription';

import { GenreCreation } from '@src/modules/genre/GenreCreation';
import { GenreRepository } from '@src/modules/genre/repository/GenreRepository';
import { GenreGettingByName } from '@src/modules/genre/GenreGettingByName';

export class PostGenreRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let body = req.body as IRequestBody;

        let genreRepository = new GenreRepository();
        let oGenreCreation = new GenreCreation({
            repo: genreRepository,
            genreGettingByName: new GenreGettingByName({
                repo: genreRepository,
            }),
        });
        let response = await oGenreCreation.execute({
            name: body.name,
        });

        res.status(201).json(<IResponseBody>response);
    }
}
