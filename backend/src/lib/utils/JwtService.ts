import jwt from 'jsonwebtoken';
import { Config } from '@src/lib/app/Config';

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

    public signJwt(payload: object,
        tokenKeyName: PRIVATE_TOKEN_KEYS, expireTime: string): string {
        switch (tokenKeyName) {
            case 'ACCESS_TOKEN_PRIVATE_KEY':
                return jwt.sign(payload, Config.ACCESS_TOKEN_PRIVATE_KEY, {
                    algorithm: 'RS256',
                    expiresIn: expireTime,
                });
            case 'REFRESH_TOKEN_PRIVATE_KEY':
                return jwt.sign(payload, `${Config.REFRESH_TOKEN_PRIVATE_KEY}`, {
                    algorithm: 'RS256',
                    expiresIn: expireTime,
                });
            default:
                throw new Error(`ERROR: Non-existing private token key - ${tokenKeyName}`);
        }
    }

    public verifyJwt(token: string, tokenKeyName: PUBLIC_TOKEN_KEYS): Record<string, unknown> {
        switch (tokenKeyName) {
            case 'ACCESS_TOKEN_PUBLIC_KEY':
                return jwt.verify(token, `${Config.ACCESS_TOKEN_PUBLIC_KEY}`) as Record<string, unknown>;
            case 'REFRESH_TOKEN_PUBLIC_KEY':
                return jwt.verify(token, `${Config.REFRESH_TOKEN_PUBLIC_KEY}`) as Record<string, unknown>;
            default:
                throw new Error(`ERROR: Non-existing public token key - ${tokenKeyName}`);
        }
    }
}
