import { Readable } from 'stream';
import { Client } from 'minio';

export interface IMinioClientOptions {
    bucket_name: string;
    minio_endpoint: string;
    minio_port: number;
    minio_SSL: boolean;
    minio_access_key: string;
    minio_secret_key: string;
}

export class MinioClient {
    private static instance: MinioClient;

    private bucket_name: string;
    private minio: Client;

    private constructor(options: IMinioClientOptions) {
        this.minio = new Client({
            endPoint: options.minio_endpoint,
            port: options.minio_port,
            useSSL: options.minio_SSL,
            accessKey: options.minio_access_key,
            secretKey: options.minio_secret_key,
        });

        this.bucket_name = options.bucket_name;
    }

    public static async Init(options: IMinioClientOptions): Promise<void> {
        if (this.instance) {
            throw new Error('MinioClient is already initialized');
        }

        this.instance = new MinioClient(options);

        let minio = this.instance.getMinioClient();
        if (!(await minio.bucketExists(options.bucket_name))) {
            await minio.makeBucket(options.bucket_name);
        }
    }

    public static GetInstance(): MinioClient {
        if (!this.instance) {
            throw new Error('PostgresqlClient is not initialized');
        }

        return this.instance;
    }

    private getMinioClient(): Client {
        return this.minio;
    }

    public async writeFile(file: Express.Multer.File, fileName: string): Promise<void> {
        await this.minio.putObject(this.bucket_name, fileName, file.buffer);
    }

    public async getFileStream(fileName: string): Promise<Readable> {
        return await this.minio.getObject(this.bucket_name, fileName);
    }
}
