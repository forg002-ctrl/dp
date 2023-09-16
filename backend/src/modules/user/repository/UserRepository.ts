import { Model, ModelCtor } from 'sequelize';

import { NotFoundError } from '@src/ext/sdk/backend/errors/types/NotFoundError';

import { PostgresqlClient } from '@src/ext/sdk/backend/storage/postgresql/PostgresqlClient';

import { ISigningUpData, ISigningUpRepository, ISigningUpResponse } from '@src/modules/auth/SigningUp';
import { IUserCheckingByUsernameRepository, IUserCheckingByUsernameOptions, IUserCheckingByUsernameResponse } from '@src/modules/user/UserCheckingByUsername';
import { IUserCheckingByEmailRepository, IUserCheckingByEmailOptions, IUserCheckingByEmailResponse } from '@src/modules/user/UserCheckingByEmail';
import { IUserGettingByUsernameOptions, IUserGettingByUsernameRepository, IUserGettingByUsernameResponse } from '@src/modules/user/UserGettingByUsername';
import { IUserGettingOptions, IUserGettingRepository, IUserGettingResponse } from '@src/modules/user/UserGetting';

export class UserRepository implements
ISigningUpRepository,
IUserCheckingByUsernameRepository,
IUserCheckingByEmailRepository,
IUserGettingByUsernameRepository,
IUserGettingRepository {
    private userModel: ModelCtor<Model<any, any>>;

    public constructor() {
        let postgresqlClient = PostgresqlClient.GetInstance();

        let userModel = postgresqlClient.getModel('users');
        if (!userModel) {
            throw new Error(`User model doesn't exist`);
        }

        this.userModel = userModel;
    }

    public async create(data: ISigningUpData): Promise<ISigningUpResponse> {
        let response = await this.userModel.create({
            username: data.username,
            email: data.email,
            password: data.password,
        });

        return {
            id_user: response.dataValues.id_user,
            username: response.dataValues.username,
            email: response.dataValues.email,
            createdAt: response.dataValues.createdAt,
            updatedAt: response.dataValues.updatedAt,
        };
    }

    public async checkUsername(options: IUserCheckingByUsernameOptions): Promise<IUserCheckingByUsernameResponse> {
        let response = await this.userModel.count({
            where: {
                username: options.username,
            },
        });

        return {
            alreadyExists: response !== 0,
        };
    }

    public async checkEmail(options: IUserCheckingByEmailOptions): Promise<IUserCheckingByEmailResponse> {
        let response = await this.userModel.count({
            where: {
                email: options.email,
            },
        });

        return {
            alreadyExists: response !== 0,
        };
    }

    public async getUserByUsername(options: IUserGettingByUsernameOptions): Promise<IUserGettingByUsernameResponse> {
        let response = await this.userModel.findOne({
            where: {
                username: options.username,
            },
            attributes: [
                ['id', 'id_user'],
                'username',
                'password',
                'email',
                'createdAt',
                'updatedAt',
            ],
        });
        if (!response) {
            throw new NotFoundError('User was not found');
        }

        return {
            id_user: response.dataValues.id_user,
            username: response.dataValues.username,
            password: response.dataValues.password,
            email: response.dataValues.email,
            createdAt: response.dataValues.createdAt,
            updatedAt: response.dataValues.updatedAt,
        };
    }

    public async getUser(options: IUserGettingOptions): Promise<IUserGettingResponse> {
        let response = await this.userModel.findByPk(options.id_user, {
            attributes: [
                ['id', 'id_user'],
                'username',
                'password',
                'email',
                'createdAt',
                'updatedAt',
            ],
            raw: true,
        }) as unknown as IUserGettingResponse | null;
        if (!response) {
            throw new Error('User was not found');
        }

        return {
            id_user: response.id_user,
            username: response.username,
            password: response.password,
            email: response.email,
            createdAt: response.createdAt,
            updatedAt: response.updatedAt,
        };
    }
}
