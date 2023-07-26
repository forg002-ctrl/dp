import { Route } from '@src/ext/sdk/backend/app/route/Route';
import { Request, Response } from 'express';

import {
    routeDescription,
    IRequestParams,
    IResponseBody,
} from '@src/ext/shared/services/backend/routes/author/DeleteRouteDescription';

import { AuthorRemoving } from '@src/modules/author/AuthorRemoving';
import { AuthorGetting } from '@src/modules/author/AuthorGetting';
import { AuthorRepository } from '@src/modules/author/repository/AuthorRepository';

import { BooksRemovingByAuthor } from '@src/modules/book/BooksRemovingByAuthor';
import { BookGetting } from '@src/modules/book/BookGetting';
import { BookRemoving } from '@src/modules/book/BookRemoving';
import { BooksListingByAuthor } from '@src/modules/book/BooksListingByAuthor';
import { BookRepository } from '@src/modules/book/repository/BookRepository';

import { FileRemoving } from '@src/modules/file/FileRemoving';

export class DeleteAuthorRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let params = req.params as unknown as IRequestParams;

        let authorRepository = new AuthorRepository();
        let bookRepository = new BookRepository();

        let oAuthorRemoving = new AuthorRemoving({
            repo: authorRepository,
            authorGetting: new AuthorGetting({
                repo: authorRepository,
            }),
            booksRemovingByAuthor: new BooksRemovingByAuthor({
                booksListingByAuthor: new BooksListingByAuthor({
                    repo: bookRepository,
                }),
                bookRemoving: new BookRemoving({
                    repo: bookRepository,
                    bookGetting: new BookGetting({
                        repo: bookRepository,
                    }),
                    fileRemoving: new FileRemoving({
                        fsSrvHost: '', //TODO: Add from env
                    }),
                }),
            }),
        });
        let response = await oAuthorRemoving.execute({
            id_author: params.id_author,
        });

        res.status(200).json(<IResponseBody>response);
    }
}
