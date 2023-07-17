import { Model, ModelCtor } from 'sequelize';

import { PostgresqlClient } from '@src/ext/sdk/backend/storage/postgresql/PostgresqlClient';

import { NotFoundError } from '@src/ext/sdk/backend/errors/types/NotFoundError';

import { ISessionCreationRepository, ISessionCreationRepositoryData, ISessionCreationResponse } from '@src/modules/session/SessionCreation';
import { ISessionGettingOptions, ISessionGettingRepository, ISessionGettingResponse } from '@src/modules/session/SessionGetting';
import { ISessionDeletingOptions, ISessionDeletingRepository } from '@src/modules/session/SessionDeleting';

export class SessionRepository implements
ISessionCreationRepository,
ISessionGettingRepository,
ISessionDeletingRepository {
    private sessionModel: ModelCtor<Model<any, any>>;

    public constructor() {
        let postgresqlClient = PostgresqlClient.GetInstance();

        let sessionModel = postgresqlClient.getModel('sessions');
        if (!sessionModel) {
            throw new Error(`Session model doesn't exist`);
        }

        this.sessionModel = sessionModel;
    }

    public async create(data: ISessionCreationRepositoryData): Promise<ISessionCreationResponse> {
        let response = await this.sessionModel.create({
            id_session: data.id_session,
            id_user: data.id_user,
        });

        return {
            id_session: response.dataValues.id_session,
        };
    }

    public async get(options: ISessionGettingOptions): Promise<ISessionGettingResponse> {
        let response = await this.sessionModel.findByPk(options.id_session);
        if (!response) {
            throw new NotFoundError('Session was not found');
        }

        return {
            id_session: response.dataValues.id_session,
            id_user: response.dataValues.id_user,
            createdAt: response.dataValues.createdAt,
        };
    }

    public async removeSession(options: ISessionDeletingOptions): Promise<void> {
        await this.sessionModel.destroy({
            where: {
                id_session: options.id_session,
            },
        });

        return;
    }
}
