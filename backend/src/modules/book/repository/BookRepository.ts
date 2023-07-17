import { Model, ModelCtor, Sequelize, col } from 'sequelize';

import { NotFoundError } from '@src/ext/sdk/backend/errors/types/NotFoundError';

import { PostgresqlClient } from '@src/ext/sdk/backend/storage/postgresql/PostgresqlClient';

import { IBookCreationRepoData, IBookCreationRepository, IBookCreationResponse } from '@src/modules/book/BookCreation';
import { IBookListingRepository, IBookListingResponse, IListBook, IListBookRepositoryParams } from '@src/modules/book/BookListing';
import { IBookGettingRepository, IBookGettingResponse, IBookGettingOptions } from '@src/modules/book/BookGetting';

export class BookRepository implements
IBookCreationRepository,
IBookListingRepository,
IBookGettingRepository {
    private bookModel: ModelCtor<Model<any, any>>;
    private authorModel: ModelCtor<Model<any, any>>;
    private genreModel: ModelCtor<Model<any, any>>;

    public constructor() {
        let postgresqlClient = PostgresqlClient.GetInstance();

        let bookModel = postgresqlClient.getModel('books');
        if (!bookModel) {
            throw new Error(`Book Model doesn't exist`);
        }

        let authorModel = postgresqlClient.getModel('authors');
        if (!authorModel) {
            throw new Error(`Author Model doesn't exist`);
        }

        let genreModel = postgresqlClient.getModel('genres');
        if (!authorModel) {
            throw new Error(`Genre Model doesn't exist`);
        }

        this.bookModel = bookModel;
        this.authorModel = authorModel;
        this.genreModel = genreModel;
    }

    public async create(data: IBookCreationRepoData): Promise<IBookCreationResponse> {
        let response = await this.bookModel.create({
            dbGenreId: data.id_genre,
            dbAuthorId: data.id_author,
            title: data.title,
            price: data.price,
            info: data.info,
            imageName: data.imageName,
        });

        return {
            id_book: response.dataValues.id,
        };
    }

    public async list(params: IListBookRepositoryParams): Promise<IBookListingResponse> {
        let response = await this.bookModel.findAll({
            include: [
                {
                    model: this.authorModel,
                    attributes: [],
                },
                {
                    model: this.genreModel,
                    attributes: [],
                },
            ],
            where: {
                title: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), 'LIKE', `%${params.search.toLowerCase()}%`),
            },
            attributes: [
                ['id', 'id_book'],
                ['dbGenreId', 'id_genre'],
                ['dbAuthorId', 'id_author'],
                [Sequelize.fn('CONCAT', col('db_author.firstname'), ' ', col('db_author.lastname')), 'author_fullname'],
                [col('db_genre.name'), 'genre_name'],
                'title',
                'price',
                'imageName',
            ],
            raw: true,
        }) as unknown as IListBook[];

        return {
            rows: response,
            rowsCount: response.length,
        };
    }

    public async get(options: IBookGettingOptions): Promise<IBookGettingResponse> {
        let response = await this.bookModel.findByPk(options.id_book, {
            include: [
                {
                    model: this.authorModel,
                    attributes: [],
                },
                {
                    model: this.genreModel,
                    attributes: [],
                },
            ],
            attributes: [
                ['id', 'id_book'],
                ['dbGenreId', 'id_genre'],
                ['dbAuthorId', 'id_author'],
                [Sequelize.fn('CONCAT', col('db_author.firstname'), ' ', col('db_author.lastname')), 'author_fullname'],
                [col('db_genre.name'), 'genre_name'],
                'title',
                'price',
                'imageName',
                'info',
            ],
            raw: true,
        }) as IBookGettingResponse | null;
        if (!response) {
            throw new NotFoundError('Book was not found');
        }

        return {
            id_book: response.id_book,
            id_author: response.id_author,
            id_genre: response.id_genre,
            author_fullname: response.author_fullname,
            genre_name: response.genre_name,
            title: response.title,
            price: response.price,
            imageName: response.imageName,
            info: response.info,
        };
    }
}
