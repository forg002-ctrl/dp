import { JwtService } from '@src/lib/utils/JwtService';

import { ISessionCreation } from '@src/modules/session/SessionCreation';

export interface IRefreshTokenSigningData {
    id_user: number;
}

export interface IRefreshTokenSigning {
    execute(payload: IRefreshTokenSigningData): Promise<string>;
}

export class RefreshTokenSigning implements IRefreshTokenSigning {
    private sessionCreation: ISessionCreation;
    private jwt: JwtService;

    public constructor(options: {
        sessionCreation: ISessionCreation;
    }) {
        this.sessionCreation = options.sessionCreation;
        this.jwt = JwtService.GetInstance();
    }

    public async execute(data: IRefreshTokenSigningData): Promise<string> {
        this.validateData(data);
        let session = await this.sessionCreation.execute({
            id_user: data.id_user,
        });

        return this.jwt.signJwt(session, 'REFRESH_TOKEN_PRIVATE_KEY', '30d');
    }

    private validateData(data: IRefreshTokenSigningData): void {
        if (!data.id_user) {
            throw new Error('User Identifier Missing');
        }
    }
}
