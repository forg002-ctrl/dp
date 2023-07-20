import { Route } from '@src/ext/sdk/backend/app/route/Route';
import { Response } from 'express';
import { CustomRequest } from '@src/ext/sdk/backend/server/middlewares/IdentificationMiddleware';

import {
    routeDescription,
    IResponseBody,
    IListQuery,
} from '@src/ext/shared/services/backend/routes//books/GetRouteDescription';

import { BookListing } from '@src/modules/book/BookListing';
import { BookRepository } from '@src/modules/book/repository/BookRepository';

export class GetBooksRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: CustomRequest, res: Response): Promise<void> {
        let queryParams = req.query as IListQuery;

        let oBookListing = new BookListing({
            repo: new BookRepository(),
        });
        let response = await oBookListing.execute(queryParams);
        console.log(response);
        
        res.status(200).json(<IResponseBody>response);
    }
}
