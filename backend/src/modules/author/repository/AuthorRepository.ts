import { Model, ModelCtor, Sequelize } from 'sequelize';

import { NotFoundError } from '@src/ext/sdk/backend/errors/types/NotFoundError';

import { PostgresqlClient } from '@src/ext/sdk/backend/storage/postgresql/PostgresqlClient';

import { IAuthorCreationRepoData, IAuthorCreationResponse, IAuthorCreationRepository } from '@src/modules/author/AuthorCreation';
import { IAuthorGettingOptions, IAuthorGettingRepository, IAuthorGettingResponse } from '@src/modules/author/AuthorGetting';
import { IAuthorsListingRepository, IAuthorsListingResponse, IListAuthor } from '@src/modules/author/AuthorsListing';
import { IAuthorRemovingRepository, IAuthorRemovingOptions } from '@src/modules/author/AuthorRemoving';

export class AuthorRepository implements
IAuthorCreationRepository,
IAuthorsListingRepository,
IAuthorGettingRepository,
IAuthorRemovingRepository {
    private authorModel: ModelCtor<Model<any, any>>;
    private bookModel: ModelCtor<Model<any, any>>;

    public constructor() {
        let postgresqlClient = PostgresqlClient.GetInstance();

        let authorModel = postgresqlClient.getModel('authors');
        if (!authorModel) {
            throw new Error(`Author Model doesn't exist`);
        }

        let bookModel = postgresqlClient.getModel('books');
        if (!bookModel) {
            throw new Error(`Book Model doesn't exist`);
        }

        this.authorModel = authorModel;
        this.bookModel = bookModel;
    }

    public async create(data: IAuthorCreationRepoData): Promise<IAuthorCreationResponse> {
        let response = await this.authorModel.create({
            firstname: data.firstname,
            lastname: data.lastname,
            birthdate: data.birthdate,
            info: data.info,
        });

        return {
            id_author: response.dataValues.id,
        };
    }

    public async get(options: IAuthorGettingOptions): Promise<IAuthorGettingResponse> {
        let response = await this.authorModel.findByPk(options.id_author, {
            include: [
                {
                    model: this.bookModel,
                    attributes: [],
                },
            ],
            attributes: [
                ['id', 'id_author'],
                'firstname',
                'lastname',
                'birthdate',
                'info',
                [Sequelize.fn('COUNT', Sequelize.col('db_books.dbAuthorId')), 'booksCount'],
            ],
            group: ['db_authors.id'],
            raw: true,
        }) as IAuthorGettingResponse | null;
        if (!response) {
            throw new NotFoundError('Author was not found');
        }

        return {
            id_author: response.id_author,
            firstname: response.firstname,
            lastname: response.lastname,
            birthdate: response.birthdate,
            info: response.info,
            booksCount: response.booksCount,
        };
    }

    public async list(): Promise<IAuthorsListingResponse> {
        let response = await this.authorModel.findAll({
            attributes: [
                ['id', 'id_author'],
                'firstname',
                'lastname',
                [Sequelize.fn('COUNT', Sequelize.col('db_books.dbAuthorId')), 'booksCount'],
            ],
            include: [
                {
                    model: this.bookModel,
                    attributes: [],
                },
            ],
            group: ['db_authors.id'],
            raw: true,
        }) as unknown as IListAuthor[];

        return {
            rows: response,
            rowsCount: response.length,
        };
    }

    public async remove(options: IAuthorRemovingOptions): Promise<void> {
        let response = await this.authorModel.destroy({
            where: {
                id: options.id_author,
            },
        });
        if (!response) {
            throw new Error('Someting went wrong in AuthorRepository remove');
        }
        if (response == 0) {
            throw new NotFoundError('Author not found');
        }
    }
}
