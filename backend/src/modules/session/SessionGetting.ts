export interface ISessionGettingOptions {
    id_session: string;
}

export interface ISessionGettingResponse {
    id_session: string;
    id_user: number;
    createdAt: Date;
}

export interface ISessionGetting {
    execute(options: ISessionGettingOptions): Promise<ISessionGettingResponse>;
}

export interface ISessionGettingRepository {
    get(options: ISessionGettingOptions): Promise<ISessionGettingResponse>;
}

export class SessionGetting implements ISessionGetting {
    private repo: ISessionGettingRepository;

    public constructor(options: {
        repo: ISessionGettingRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(options: ISessionGettingOptions): Promise<ISessionGettingResponse> {
        this.validateOptions(options);

        return await this.repo.get({
            id_session: options.id_session,
        });
    }

    private validateOptions(options: ISessionGettingOptions): void {
        if (!options.id_session) {
            throw new Error('Session Identifier missing');
        }
    }
}
