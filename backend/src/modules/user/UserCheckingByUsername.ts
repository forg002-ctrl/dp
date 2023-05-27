export interface IUserCheckingByUsernameOptions {
    username: string;
}

export interface IUserCheckingByUsernameResponse {
    alreadyExists: boolean;
}

export interface IUserCheckingByUsername {
    execute(options: IUserCheckingByUsernameOptions): Promise<IUserCheckingByUsernameResponse>;
}

export interface IUserCheckingByUsernameRepository {
    checkUsername(options: IUserCheckingByUsernameOptions): Promise<IUserCheckingByUsernameResponse>;
}

export class UserCheckingByUsername implements IUserCheckingByUsername {
    private repo: IUserCheckingByUsernameRepository;

    public constructor(options: {
        repo: IUserCheckingByUsernameRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(options: IUserCheckingByUsernameOptions): Promise<IUserCheckingByUsernameResponse> {
        this.validateOptions(options);

        return await this.repo.checkUsername({
            username: options.username,
        });
    }

    private validateOptions(options: IUserCheckingByUsernameOptions): void {
        if (!options.username) {
            throw new Error('Username Missing');
        }
    }
}
