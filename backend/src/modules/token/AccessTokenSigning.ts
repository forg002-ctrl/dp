import { Config } from '@src/lib/Config';

import { JwtService } from '@src/ext/sdk/backend/utils/JwtService';

export interface IAccessTokenSigningData {
    id_user: number;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAccessTokenSigning {
    execute(payload: IAccessTokenSigningData): string;
}

export class AccessTokenSigning implements IAccessTokenSigning {
    private jwt: JwtService;

    public constructor() {
        this.jwt = JwtService.GetInstance();
    }

    public execute(payload: IAccessTokenSigningData): string {
        this.validateData(payload);

        return this.jwt.signJwt(payload, 'ACCESS_TOKEN_PRIVATE_KEY', '15h', Config.ACCESS_TOKEN_PRIVATE_KEY, Config.REFRESH_TOKEN_PRIVATE_KEY); //TODO: CHANGE
    }

    private validateData(data: IAccessTokenSigningData): void {
        if (!data.id_user) {
            throw new Error('User Identifier Missing');
        }
        if (!data.username) {
            throw new Error('Username Missing');
        }
        if (!data.email) {
            throw new Error('Email Missing');
        }
        if (!data.createdAt) {
            throw new Error('Creating Date Missing');
        }
        if (!data.updatedAt) {
            throw new Error('Updating Date Missing');
        }
    }
}
