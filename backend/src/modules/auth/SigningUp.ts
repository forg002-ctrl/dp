import { uuid } from 'uuidv4';

import { Crypto } from '@src/ext/sdk/backend/utils/Crypto';
import { RegExpLibrary } from '@src/ext/sdk/backend/utils/RegExpLibrary';

import { UserInputError } from '@src/ext/sdk/backend/errors/types/UserInputError';

import { IUserCheckingByUsername } from '@src/modules/user/UserCheckingByUsername';
import { IUserCheckingByEmail } from '@src/modules/user/UserCheckingByEmail';

export interface ISigningUpData {
    username: string;
    email: string;
    password: string;
}

export interface ISigningUpRepoData {
    id_user: string;
    username: string;
    email: string;
    password: string;
}

export interface ISigningUpResponse {
    id_user: number;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ISigningUpRepository {
    create(data: ISigningUpRepoData): Promise<ISigningUpResponse>;
}

export interface IUserSigningUp {
    execute(data: ISigningUpData): Promise<ISigningUpResponse>;
}

export class SigningUp implements IUserSigningUp {
    private repo: ISigningUpRepository;
    private userCheckingByUsername: IUserCheckingByUsername;
    private userCheckingByEmail: IUserCheckingByEmail;
    private crypto: Crypto;

    public constructor(options: {
        repo: ISigningUpRepository;
        userCheckingByUsername: IUserCheckingByUsername;
        userCheckingByEmail: IUserCheckingByEmail;
    }) {
        this.repo = options.repo;
        this.userCheckingByUsername = options.userCheckingByUsername;
        this.userCheckingByEmail = options.userCheckingByEmail;
        this.crypto = new Crypto();
    }

    public async execute(data: ISigningUpData): Promise<ISigningUpResponse> {
        this.validateData(data);

        let userCheckingByUsernameResponse = await this.userCheckingByUsername.execute({
            username: data.username,
        });
        if (userCheckingByUsernameResponse.alreadyExists) {
            throw new UserInputError('User with such username already exists');
        }

        let userCheckingByEmailResponse = await this.userCheckingByEmail.execute({
            email: data.email,
        });
        if (userCheckingByEmailResponse.alreadyExists) {
            throw new UserInputError('User with such email already exists');
        }

        let repoResponse = await this.repo.create({
            id_user: uuid(),
            username: data.username,
            email: data.email,
            password: await this.crypto.hashPassword(data.password),
        });

        return repoResponse;
    }

    private validateData(data: ISigningUpData): void {
        let regExpLibrary = new RegExpLibrary();

        if (!data.username) {
            throw new Error('Username is missing');
        }
        if (!data.email) {
            throw new Error('Email is missing');
        }
        if (!data.password) {
            throw new Error('Password is missing');
        }

        if (!regExpLibrary.emailRegExp.test(data.email)) {
            throw new UserInputError(`Incorrect email`);
        }
        if (!regExpLibrary.passwordRegExp.test(data.password)) {
            throw new UserInputError(`Password must contain 8 characters and at least one number, one letter and one unique character such as !#$%&?@`);
        }
    }
}
