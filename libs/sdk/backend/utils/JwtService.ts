import jwt from 'jsonwebtoken';

type PRIVATE_TOKEN_KEYS = 'ACCESS_TOKEN_PRIVATE_KEY' | 'REFRESH_TOKEN_PRIVATE_KEY';
type PUBLIC_TOKEN_KEYS = 'ACCESS_TOKEN_PUBLIC_KEY' | 'REFRESH_TOKEN_PUBLIC_KEY';

export class JwtService {
    private static instance: JwtService;

    private static Init(): void {
        if (this.instance) {
            throw new Error('JwtService is already initialized');
        }

        this.instance = new JwtService();
    }

    public static GetInstance(): JwtService {
        if (!this.instance) {
            this.Init();
        }

        return this.instance;
    }

    public signJwt(payload: object, tokenKeyName: PRIVATE_TOKEN_KEYS,
        expireTime: string, access_token_private_key: string, refresh_token_private_key: string): string {
        switch (tokenKeyName) {
            case 'ACCESS_TOKEN_PRIVATE_KEY':
                return jwt.sign(payload, `${access_token_private_key}`, {
                    algorithm: 'RS256',
                    expiresIn: expireTime,
                });
            case 'REFRESH_TOKEN_PRIVATE_KEY':
                return jwt.sign(payload, `${refresh_token_private_key}`, {
                    algorithm: 'RS256',
                    expiresIn: expireTime,
                });
            default:
                throw new Error(`ERROR: Non-existing private token key - ${tokenKeyName}`);
        }
    }

    public verifyJwt(token: string, tokenKeyName: PUBLIC_TOKEN_KEYS,
        access_token_public_key: string, refresh_token_public_key: string): Record<string, unknown> {
        switch (tokenKeyName) {
            case 'ACCESS_TOKEN_PUBLIC_KEY':
                return jwt.verify(token, `${access_token_public_key}`) as Record<string, unknown>;
            case 'REFRESH_TOKEN_PUBLIC_KEY':
                return jwt.verify(token, `${refresh_token_public_key}`) as Record<string, unknown>;
            default:
                throw new Error(`ERROR: Non-existing public token key - ${tokenKeyName}`);
        }
    }
}
