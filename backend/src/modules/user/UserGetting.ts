export interface IUserGettingOptions {
    id_user: number;
}

export interface IUserGettingResponse {
    id_user: number;
    username: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserGetting {
    execute(options: IUserGettingOptions): Promise<IUserGettingResponse>;
}

export interface IUserGettingRepository {
    getUser(options: IUserGettingOptions): Promise<IUserGettingResponse>;
}

export class UserGetting implements IUserGetting {
    private repo: IUserGettingRepository;

    public constructor(options: {
        repo: IUserGettingRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(options: IUserGettingOptions): Promise<IUserGettingResponse> {
        this.validateOptions(options);

        return await this.repo.getUser({
            id_user: options.id_user,
        });
    }

    private validateOptions(options: IUserGettingOptions): void {
        if (!options.id_user) {
            throw new Error('User Identifier Missing');
        }
    }
}
