export interface IConfigOptions {
    http_server_port: number;
    minio_endpoint: string;
    minio_port: number;
    minio_ssl: boolean;
    minio_access_key: string;
    minio_secret_key: string;
}

export class Config {
    private static instance: Config;

    public static HTTP_SERVER_PORT: number;
    public static MINIO_ENDPOINT: string;
    public static MINIO_PORT: number;
    public static MINIO_SSL: boolean;
    public static MINIO_ACCESS_KEY: string;
    public static MINIO_SECRET_KEY: string;

    private constructor(options: IConfigOptions) {
        Config.HTTP_SERVER_PORT = options.http_server_port;
        Config.MINIO_ENDPOINT = options.minio_endpoint;
        Config.MINIO_PORT = options.minio_port;
        Config.MINIO_SSL = options.minio_ssl;
        Config.MINIO_ACCESS_KEY = options.minio_access_key;
        Config.MINIO_SECRET_KEY = options.minio_secret_key;
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
