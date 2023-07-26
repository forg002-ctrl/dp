import { Route } from '@src/ext/sdk/backend/app/route/Route';
import { Request, Response } from 'express';

import {
    routeDescription,
    IRequestParams,
    IResponseBody,
} from '@src/ext/shared/services/backend/routes/genre/DeleteRouteDescription';

import { GenreRemoving } from '@src/modules/genre/GenreRemoving';
import { GenreGetting } from '@src/modules/genre/GenreGetting';
import { GenreRepository } from '@src/modules/genre/repository/GenreRepository';

import { BooksRemovingByGenre } from '@src/modules/book/BooksRemovingByGenre';
import { BooksListingByGenre } from '@src/modules/book/BooksListingByGenre';
import { BookRemoving } from '@src/modules/book/BookRemoving';
import { BookGetting } from '@src/modules/book/BookGetting';
import { BookRepository } from '@src/modules/book/repository/BookRepository';

import { FileRemoving } from '@src/modules/file/FileRemoving';

export class DeleteGenreRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let params = req.params as unknown as IRequestParams;

        let genreRepository = new GenreRepository();
        let bookRepository = new BookRepository();

        let oGenreRemoving = new GenreRemoving({
            repo: genreRepository,
            genreGetting: new GenreGetting({
                repo: genreRepository,
            }),
            booksRemovingByGenre: new BooksRemovingByGenre({
                booksListingByGenre: new BooksListingByGenre({
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
        let response = await oGenreRemoving.execute({
            id_genre: params.id_genre,
        });

        res.status(200).json(<IResponseBody>response);
    }
}
