export interface IConfigOptions {
    http_server_port: number;
    db_host: string;
    db_user: string;
    db_password: string;
    db_name: string;
    access_token_public_key: string;
    access_token_private_key: string;
    refresh_token_public_key: string;
    refresh_token_private_key: string;
}

export class Config {
    private static instance: Config;

    public static HTTP_SERVER_PORT: number;
    public static DB_HOST: string;
    public static DB_USER: string;
    public static DB_PASSWORD: string;
    public static DB_NAME: string;
    public static ACCESS_TOKEN_PUBLIC_KEY: string;
    public static ACCESS_TOKEN_PRIVATE_KEY: string;
    public static REFRESH_TOKEN_PUBLIC_KEY: string;
    public static REFRESH_TOKEN_PRIVATE_KEY: string;

    private constructor(options: IConfigOptions) {
        Config.HTTP_SERVER_PORT = options.http_server_port;
        Config.DB_HOST = options.db_host;
        Config.DB_USER = options.db_user;
        Config.DB_PASSWORD = options.db_password;
        Config.DB_NAME = options.db_name;
        Config.ACCESS_TOKEN_PUBLIC_KEY = options.access_token_public_key;
        Config.ACCESS_TOKEN_PRIVATE_KEY = options.access_token_private_key;
        Config.REFRESH_TOKEN_PUBLIC_KEY = options.refresh_token_public_key;
        Config.REFRESH_TOKEN_PRIVATE_KEY = options.refresh_token_private_key;
    }

    public static Init(options: IConfigOptions): void {
        if (this.instance) {
            throw new Error('Config is already initialized');
        }

        this.instance = new Config(options);
    }

    public static GetInstance(): Config {
        if (!this.instance) {
            throw new Error('Not initialized');
        }

        return this.instance;
    }
}
