import { Model, ModelCtor } from 'sequelize';

import { PostgresqlClient } from '@src/ext/sdk/backend/storage/postgresql/PostgresqlClient';

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
            dbUserId: data.id_user,
        });

        return {
            id_session: response.dataValues.id,
        };
    }

    public async get(options: ISessionGettingOptions): Promise<ISessionGettingResponse> {
        let response = await this.sessionModel.findByPk(options.id_session, {
            attributes: [
                ['id', 'id_session'],
                ['dbUserId', 'id_user'],
            ],
            raw: true,
        }) as unknown as ISessionGettingResponse | null;
        if (!response) {
            throw new Error('Session was not found');
        }

        return {
            id_session: response.id_session,
            id_user: response.id_user,
            createdAt: response.createdAt,
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
