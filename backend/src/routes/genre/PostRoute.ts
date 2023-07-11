import { Request, Response } from 'express';

import { Route } from '@src/lib/app/route/Route';

import { routeDescription,
    IRequestBody,
    IResponseBody
} from '@src/ext/shared/routes//genre/PostRouteDescription';

import { GenreCreation } from '@src/modules/genre/GenreCreation';
import { GenreRepository } from '@src/modules/genre/repository/GenreRepository';

export class PostGenreRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let body = req.body as IRequestBody;

        let oGenreCreation = new GenreCreation({
            repo: new GenreRepository(),
        });
        let response = await oGenreCreation.execute({
            name: body.name,
        });

        res.status(201).json(<IResponseBody>response);
    }
}
