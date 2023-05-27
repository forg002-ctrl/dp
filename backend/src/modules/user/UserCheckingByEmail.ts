export interface IUserCheckingByEmailOptions {
    email: string;
}

export interface IUserCheckingByEmailResponse {
    alreadyExists: boolean;
}

export interface IUserCheckingByEmail {
    execute(options: IUserCheckingByEmailOptions): Promise<IUserCheckingByEmailResponse>;
}

export interface IUserCheckingByEmailRepository {
    checkEmail(options: IUserCheckingByEmailOptions): Promise<IUserCheckingByEmailResponse>;
}

export class UserCheckingByEmail implements IUserCheckingByEmail {
    private repo: IUserCheckingByEmailRepository;

    public constructor(options: {
        repo: IUserCheckingByEmailRepository;
    }) {
        this.repo = options.repo;
    }

    public async execute(options: IUserCheckingByEmailOptions): Promise<IUserCheckingByEmailResponse> {
        this.validateOptions(options);

        return await this.repo.checkEmail({
            email: options.email,
        });
    }

    private validateOptions(options: IUserCheckingByEmailOptions): void {
        if (!options.email) {
            throw new Error('Email Missing');
        }
    }
}
