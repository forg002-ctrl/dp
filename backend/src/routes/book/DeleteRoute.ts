import { Route } from '@src/ext/sdk/backend/app/route/Route';
import { Request, Response } from 'express';

import {
    routeDescription,
    IRequestParams,
    IResponseBody,
} from '@src/ext/shared/services/backend/routes/book/DeleteRouteDescription';

import { BookRemoving } from '@src/modules/book/BookRemoving';
import { BookGetting } from '@src/modules/book/BookGetting';
import { BookRepository } from '@src/modules/book/repository/BookRepository';

import { FileRemoving } from '@src/modules/file/FileRemoving';

export class DeleteBookRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let params = req.params as unknown as IRequestParams;

        let bookRepository = new BookRepository();
        let oBookGetting = new BookRemoving({
            repo: bookRepository,
            bookGetting: new BookGetting({
                repo: bookRepository,
            }),
            fileRemoving: new FileRemoving({
                fsSrvHost: '', //TODO: Add from env
            }),
        });
        let response = await oBookGetting.execute({
            id_book: params.id_book,
        });

        res.status(200).json(<IResponseBody>response);
    }
}
