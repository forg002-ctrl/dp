export interface ISessionDeletingOptions {
    id_session: string;
}

export interface ISessionDeletingResponse {
    success: boolean;
}

export interface ISessionDeleting {
    execute(options: ISessionDeletingOptions): Promise<ISessionDeletingResponse>;
}

export interface ISessionDeletingRepository {
    removeSession(options: ISessionDeletingOptions): Promise<void>;
}

export class SessionDeleting implements ISessionDeleting {
    private repo: ISessionDeletingRepository;

    public constructor(options: {
        repo: ISessionDeletingRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(options: ISessionDeletingOptions): Promise<ISessionDeletingResponse> {
        this.validateOptions(options);

        await this.repo.removeSession({
            id_session: options.id_session,
        });

        return {
            success: true,
        };
    }

    private validateOptions(options: ISessionDeletingOptions): void {
        if (!options.id_session) {
            throw new Error('Session Identifier missing');
        }
    }
}
