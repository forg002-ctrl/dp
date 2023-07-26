import { Model, ModelCtor, Sequelize } from 'sequelize';

import { NotFoundError } from '@src/ext/sdk/backend/errors/types/NotFoundError';

import { PostgresqlClient } from '@src/ext/sdk/backend/storage/postgresql/PostgresqlClient';

import { IGenreCreationRepoData, IGenreCreationRepository, IGenreCreationResponse } from '@src/modules/genre/GenreCreation';
import { IGenreGettingOptions, IGenreGettingRepository, IGenreGettingResponse } from '@src/modules/genre/GenreGetting';
import { IGenresListingRepository, IGenresListingResponse, IListGenre } from '@src/modules/genre/GenresListing';
import { IGenreRemovingOptions, IGenreRemovingRepository } from '@src/modules/genre/GenreRemoving';

export class GenreRepository implements
IGenreCreationRepository,
IGenresListingRepository,
IGenreGettingRepository,
IGenreRemovingRepository {
    private genreModel: ModelCtor<Model<any, any>>;
    private bookModel: ModelCtor<Model<any, any>>;

    public constructor() {
        let postgresqlClient = PostgresqlClient.GetInstance();

        let genreModel = postgresqlClient.getModel('genres');
        if (!genreModel) {
            throw new Error(`Genre model doesn't exist`);
        }

        let bookModel = postgresqlClient.getModel('books');
        if (!bookModel) {
            throw new Error(`Genre model doesn't exist`);
        }

        this.genreModel = genreModel;
        this.bookModel = bookModel;
    }

    public async create(data: IGenreCreationRepoData): Promise<IGenreCreationResponse> {
        let response = await this.genreModel.create({
            name: data.name,
        });

        return {
            id_genre: response.dataValues.id,
        };
    }

    public async get(options: IGenreGettingOptions): Promise<IGenreGettingResponse> {
        let response = await this.genreModel.findByPk(options.id_genre, {
            attributes: [
                ['id', 'id_genre'],
                'name',
                [Sequelize.fn('COUNT', Sequelize.col('db_books.dbGenreId')), 'booksCount'],
            ],
            include: [
                {
                    model: this.bookModel,
                    attributes: [],
                },
            ],
            group: ['db_genres.id'],
            raw: true,
        }) as unknown as IGenreGettingResponse | null;
        if (!response) {
            throw new NotFoundError('Genre was not found');
        }

        return {
            id_genre: response.id_genre,
            name: response.name,
            booksCount: response.booksCount,
        };
    }

    public async list(): Promise<IGenresListingResponse> {
        let response = await this.genreModel.findAll({
            attributes: [
                ['id', 'id_genre'],
                'name',
                [Sequelize.fn('COUNT', Sequelize.col('db_books.dbGenreId')), 'booksCount'],
            ],
            include: [
                {
                    model: this.bookModel,
                    attributes: [],
                },
            ],
            group: ['db_genres.id'],
            raw: true,
        }) as unknown as IListGenre[];

        return {
            rows: response,
            rowsCount: response.length,
        };
    }

    public async remove(options: IGenreRemovingOptions): Promise<void> {
        let response = await this.genreModel.destroy({
            where: {
                id: options.id_genre,
            },
        });
        if (!response) {
            throw new Error('Someting went wrong in GenreRepository remove');
        }
        if (response == 0) {
            throw new NotFoundError('Genre not found');
        }
    }
}
