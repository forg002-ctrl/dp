import { Route } from '@src/lib/app/route/Route';
import { Response } from 'express';
import { CustomRequest } from '@src/lib/server/middlewares/IdentificationMiddleware';

import {
    routeDescription,
    IResponseBody,
} from '@src/routes/books/GetRouteDescription';
import { BookListing } from '@src/modules/book/BookListing';
import { BookRepository } from '@src/modules/book/repository/BookRepository';

export class GetBooksRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: CustomRequest, res: Response): Promise<void> {
        let oBookListing = new BookListing({
            repo: new BookRepository(),
        });
        let response = await oBookListing.execute();

        res.status(200).json(<IResponseBody>response);
    }
}
