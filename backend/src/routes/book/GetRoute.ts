import { Route } from '@src/ext/sdk/backend/app/route/Route';
import { Request, Response } from 'express';

import {
    routeDescription,
    IRequestParams,
    IResponseBody,
} from '@src/ext/shared/services/backend/routes/book/GetRouteDescription';

import { BookGetting } from '@src/modules/book/BookGetting';
import { BookRepository } from '@src/modules/book/repository/BookRepository';

export class GetBookRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let params = req.params as unknown as IRequestParams;

        let oBookGetting = new BookGetting({
            repo: new BookRepository(),
        });
        let response = await oBookGetting.execute({
            id_book: params.id_book,
        });

        res.status(200).json(<IResponseBody>response);
    }
}
