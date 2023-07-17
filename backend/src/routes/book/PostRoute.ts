import { Request, Response } from 'express';

import { Route } from '@src/ext/sdk/backend/app/route/Route';

import { routeDescription,
    IRequestBody,
    IResponseBody,
} from '@src/ext/shared/services/backend/routes//book/PostRouteDescription';

import { GenreGetting } from '@src/modules/genre/GenreGetting';
import { GenreRepository } from '@src/modules/genre/repository/GenreRepository';

import { AuthorGetting } from '@src/modules/author/AuthorGetting';
import { AuthorRepository } from '@src/modules/author/repository/AuthorRepository';

import { FileSaving } from '@src/modules/file/FileSaving';

import { BookCreation } from '@src/modules/book/BookCreation';
import { BookRepository } from '@src/modules/book/repository/BookRepository';

export class PostBookRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let body = req.body as IRequestBody;

        if (!req.files || !req.files.file) {
            throw new Error('No file passed');
        }
        let file = req.files.file;

        let oFileSaving = new FileSaving();
        let fileName = oFileSaving.saveFile(file);

        let oBookCreation = new BookCreation({
            repo: new BookRepository(),
            genreGetting: new GenreGetting({
                repo: new GenreRepository(),
            }),
            authorGetting: new AuthorGetting({
                repo: new AuthorRepository(),
            }),
        });
        let response = await oBookCreation.execute({
            id_genre: body.id_genre,
            id_author: body.id_author,
            title: body.title,
            price: body.price,
            info: body.info,
            imageName: fileName,
        });

        res.status(201).json(<IResponseBody>response);
    }
}
