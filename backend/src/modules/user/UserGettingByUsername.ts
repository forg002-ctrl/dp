export interface IUserGettingByUsernameOptions {
    username: string;
}

export interface IUserGettingByUsernameResponse {
    id_user: number;
    username: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserGettingByUsername {
    execute(options: IUserGettingByUsernameOptions): Promise<IUserGettingByUsernameResponse>;
}

export interface IUserGettingByUsernameRepository {
    getUserByUsername(options: IUserGettingByUsernameOptions): Promise<IUserGettingByUsernameResponse>;
}

export class UserGettingByUsername implements IUserGettingByUsername {
    private repo: IUserGettingByUsernameRepository;

    public constructor(options: {
        repo: IUserGettingByUsernameRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(options: IUserGettingByUsernameOptions): Promise<IUserGettingByUsernameResponse> {
        this.validateOptions(options);

        return await this.repo.getUserByUsername({
            username: options.username,
        });
    }

    private validateOptions(options: IUserGettingByUsernameOptions): void {
        if (!options.username) {
            throw new Error('Username Missing');
        }
    }
}
