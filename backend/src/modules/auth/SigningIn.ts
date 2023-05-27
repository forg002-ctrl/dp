import { Crypto } from '@src/lib/utils/Crypto';

import { UserInputError } from '@src/lib/errors/types/UserInputError';

import { IUserGettingByUsername } from '@src/modules/user/UserGettingByUsername';
import { IAccessTokenSigning } from '@src/modules/token/AccessTokenSigning';
import { IRefreshTokenSigning } from '@src/modules/token/RefreshTokenSigning';

export interface ISigningInOptions {
  username: string;
  password: string;
}

export interface ISigningInResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id_user: number;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface ISigningIn {
  execute(options: ISigningInOptions): Promise<ISigningInResponse>;
}

export class SigningIn implements ISigningIn {
    private userGettingByUsername: IUserGettingByUsername;
    private accessTokenSigning: IAccessTokenSigning;
    private refreshTokenSigning: IRefreshTokenSigning;
    private crypto: Crypto;

    public constructor(options: {
    userGettingByUsername: IUserGettingByUsername;
    accessTokenSigning: IAccessTokenSigning;
    refreshTokenSigning: IRefreshTokenSigning;
  }) {
        this.crypto = new Crypto();
        this.userGettingByUsername = options.userGettingByUsername;
        this.accessTokenSigning = options.accessTokenSigning;
        this.refreshTokenSigning = options.refreshTokenSigning;
    }

    public async execute(options: ISigningInOptions): Promise<ISigningInResponse> {
        this.validateOptions(options);

        let user = await this.userGettingByUsername.execute({
            username: options.username,
        });
        if (!user) {
            throw new UserInputError('Wrong username');
        }

        if (
            !(await this.crypto.comparePasswords(options.password, user.password))
        ) {
            throw new UserInputError('Wrong password');
        }

        console.log(user);
        let accessToken = this.accessTokenSigning.execute({
            id_user: user.id_user,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });

        let refreshToken = await this.refreshTokenSigning.execute({
            id_user: user.id_user,
        });

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: {
                id_user: user.id_user,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        };
    }

    private validateOptions(options: ISigningInOptions): void {
        if (!options.username) {
            throw new Error('Username is missing');
        }

        if (!options.password) {
            throw new Error('Password is missing');
        }
    }
}
