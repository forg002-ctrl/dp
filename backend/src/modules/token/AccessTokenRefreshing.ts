import { ErrorHandler } from '@src/ext/sdk/backend/errors/ErorrHandler';
import { AuthError } from '@src/ext/sdk/backend/errors/types/AuthError';

import { Config } from '@src/lib/Config';

import { JwtService } from '@src/ext/sdk/backend/utils/JwtService';

import { ISessionGetting } from '@src/modules/session/SessionGetting';
import { IUserGetting } from '@src/modules/user/UserGetting';
import { IAccessTokenSigning } from './AccessTokenSigning';

interface IJwtTokenPayload {
    id_session: string;
}

export interface IAccessTokenRefreshingData {
    refreshToken: string;
}

export interface IAccessTokenRefreshingResponse {
    accessToken: string;
}

export interface IAccessTokenRefreshing {
    execute(data: IAccessTokenRefreshingData): Promise<IAccessTokenRefreshingResponse>;
}

export class AccessTokenRefreshing implements IAccessTokenRefreshing {
    private jwt: JwtService;
    private sessionGetting: ISessionGetting;
    private userGetting: IUserGetting;
    private accessTokenSigning: IAccessTokenSigning;

    public constructor(options: {
        sessionGetting: ISessionGetting;
        userGetting: IUserGetting;
        accessTokenSigning: IAccessTokenSigning;
    }) {
        this.jwt = JwtService.GetInstance();
        this.sessionGetting = options.sessionGetting;
        this.userGetting = options.userGetting;
        this.accessTokenSigning = options.accessTokenSigning;
    }

    public async execute(data: IAccessTokenRefreshingData): Promise<IAccessTokenRefreshingResponse> {
        this.validateData(data);

        let decodedData: IJwtTokenPayload;
        try {
            decodedData = this.jwt.verifyJwt(data.refreshToken, 'REFRESH_TOKEN_PUBLIC_KEY', Config.ACCESS_TOKEN_PUBLIC_KEY, Config.REFRESH_TOKEN_PUBLIC_KEY) as unknown as IJwtTokenPayload;
            if (!decodedData.id_session) {
                throw new AuthError();
            }
        } catch (err) {
            throw new AuthError();
        }

        try {
            let session = await this.sessionGetting.execute({
                id_session: decodedData.id_session,
            });

            let user = await this.userGetting.execute({
                id_user: session.id_user,
            });

            let accessToken = this.accessTokenSigning.execute({
                id_user: user.id_user,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            });

            return {
                accessToken: accessToken,
            };
        } catch (err) {
            let errorHandler = ErrorHandler.GetInstance();
            if (errorHandler.isNotFoundError(err)) {
                throw new AuthError();
            }

            throw new Error(err.mesage);
        }
    }

    private validateData(data: IAccessTokenRefreshingData): void {
        if (!data.refreshToken) {
            throw new AuthError();
        }
    }
}
