import { Model, ModelCtor, Sequelize } from 'sequelize';

import { NotFoundError } from '@src/ext/sdk/backend/errors/types/NotFoundError';

import { PostgresqlClient } from '@src/ext/sdk/backend/storage/postgresql/PostgresqlClient';

import { IGenreCreationRepoData, IGenreCreationRepository, IGenreCreationResponse } from '@src/modules/genre/GenreCreation';
import { IGenreGettingOptions, IGenreGettingRepository, IGenreGettingResponse } from '@src/modules/genre/GenreGetting';
import { IGenreGettingByNameOptions, IGenreGettingByNameRepository, IGenreGettingByNameResponse } from '@src/modules/genre/GenreGettingByName';
import { IGenresListingRepository, IGenresListingResponse, IListGenre, IListGenreRepositoryParams } from '@src/modules/genre/GenresListing';
import { IGenreRemovingOptions, IGenreRemovingRepository } from '@src/modules/genre/GenreRemoving';

export class GenreRepository implements
IGenreCreationRepository,
IGenresListingRepository,
IGenreGettingRepository,
IGenreGettingByNameRepository,
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

    public async list(params: IListGenreRepositoryParams): Promise<IGenresListingResponse> {
        let response = await this.genreModel.findAll({
            where: {
                title: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${params.search.toLowerCase()}%`),
            },
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

    public async getByName(options: IGenreGettingByNameOptions): Promise<IGenreGettingByNameResponse | null> {
        let response = await this.genreModel.findOne({
            where: {
                name: options.name,
            },
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
        if (response) {
            return {
                id_genre: response.id_genre,
                name: response.name,
                booksCount: response.booksCount,
            };
        } else {
            return null;
        }
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
        if (response === 0) {
            throw new NotFoundError('Genre not found');
        }
    }
}
