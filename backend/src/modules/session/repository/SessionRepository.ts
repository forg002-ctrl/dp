import { Model, ModelCtor } from 'sequelize';

import { Database } from '@src/lib/app/Database';

import { NotFoundError } from '@src/lib/errors/types/NotFoundError';

import { ISessionCreationRepository, ISessionCreationRepositoryData, ISessionCreationResponse } from '@src/modules/session/SessionCreation';
import { ISessionGettingOptions, ISessionGettingRepository, ISessionGettingResponse } from '@src/modules/session/SessionGetting';
import { ISessionDeletingOptions, ISessionDeletingRepository } from '@src/modules/session/SessionDeleting';

export class SessionRepository implements
ISessionCreationRepository,
ISessionGettingRepository,
ISessionDeletingRepository {
    private db: ModelCtor<Model<any, any>>;

    public constructor() {
        let db = Database.GetInstance().getModel('sessions');
        if (!db) {
            throw new Error(`Session model doesn't exist`);
        }

        this.db = db;
    }

    public async create(data: ISessionCreationRepositoryData): Promise<ISessionCreationResponse> {
        let response = await this.db.create({
            id_session: data.id_session,
            id_user: data.id_user,
        });

        return {
            id_session: response.dataValues.id_session,
        };
    }

    public async get(options: ISessionGettingOptions): Promise<ISessionGettingResponse> {
        let response = await this.db.findByPk(options.id_session);
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
        await this.db.destroy({
            where: {
                id_session: options.id_session,
            },
        });

        return;
    }
}
