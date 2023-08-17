import { IRemoteService, RemoteService } from './remoteService/RemoteService';

export interface IInitOptions {
    serviceName: string;
    testMode?: boolean;
}

export class SDK {
    protected static instance: SDK;

    protected testMode: boolean;
    protected serviceName: string;

    protected constructor(options: IInitOptions) {
        this.testMode = options.testMode ? options.testMode : false;
        this.serviceName = options.serviceName;
    }

    public static Init(options: IInitOptions): void {
        if (this.instance) {
            throw new Error('Already instantiated');
        }

        this.instance = options.testMode ? TestSDK.InitTestSDK(options) : new SDK(options);
    }

    public static GetInstance(): SDK {
        if (!this.instance) {
            throw new Error('Not instantiated');
        }

        return this.instance;
    }

    public async getRemoteService(serviceName: string): Promise<IRemoteService> {
        return new RemoteService({
            serviceName: serviceName,
        });
    }
}

export class TestSDK extends SDK {
    protected remotes: Record<string, IRemoteService> = {};

    protected constructor(options: IInitOptions) {
        super(options);

        if (!options.testMode) {
            throw new Error('Cannot init TestSDK without test mode enabled');
        }
    }

    public static InitTestSDK(options: IInitOptions): TestSDK {
        return new TestSDK(options);
    }

    public setRemoteService(remote: IRemoteService): void {
        this.remotes[remote.getServiceName()] = remote;
    }

    public resetRemoteServices(): void {
        this.remotes = {};
    }

    public async getRemoteService(serviceName: string): Promise<IRemoteService> {
        if (!this.remotes[serviceName]) {
            throw new Error(`Undefined remote service ${serviceName}`);
        }

        return this.remotes[serviceName];
    }
}
